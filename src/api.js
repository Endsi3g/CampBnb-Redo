/**
 * CampBnB API Client - Supabase Native Version
 * Handles direct database communication via Supabase SDK
 */
import { supabase } from './lib/supabase.js';

// Helper to handle Supabase responses
const handleResponse = async (promise) => {
    const { data, error } = await promise;
    if (error) {
        console.error('Supabase Error:', error);
        throw new Error(error.message);
    }
    return data;
};

// ============ AUTH API ============

export const auth = {
    async register(email, password, name) {
        // 1. Sign up auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });

        if (authError) throw new Error(authError.message);

        // 2. Create public user profile (if not automatically created by trigger)
        // Note: Ideally a Postgres Trigger handles this, but we'll do it manually for now if needed.
        // Prisma schema says User table has email, name, etc.
        // We might need to ensure the ID matches Supabase Auth ID.

        return {
            user: { ...authData.user, name },
            token: authData.session?.access_token
        };
    },

    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw new Error(error.message);

        return {
            user: data.user,
            token: data.session.access_token
        };
    },

    async me() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        // Fetch additional profile data from 'User' table if needed
        const { data: profile } = await supabase
            .from('User')
            .select('*')
            .eq('id', user.id)
            .single();

        return profile || user;
    },

    async forgotPassword(email) {
        return handleResponse(supabase.auth.resetPasswordForEmail(email));
    },

    async logout() {
        await supabase.auth.signOut();
        window.location.hash = '/signin';
    }
};

// ============ LISTINGS API ============

export const listings = {
    async search(params = {}) {
        let query = supabase.from('Listing').select('*, host:User(*)');

        if (params.type) {
            query = query.eq('type', params.type);
        }
        if (params.limit) {
            query = query.limit(Number(params.limit));
        }
        // Add more filters as needed

        return handleResponse(query);
    },

    async getHostListings() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        return handleResponse(
            supabase.from('Listing').select('*').eq('hostId', user.id)
        );
    },

    async get(id) {
        return handleResponse(
            supabase.from('Listing').select('*, host:User(*)').eq('id', id).single()
        );
    },

    async create(data) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const listingData = { ...data, hostId: user.id };
        return handleResponse(
            supabase.from('Listing').insert(listingData).select().single()
        );
    },

    async update(id, data) {
        return handleResponse(
            supabase.from('Listing').update(data).eq('id', id).select().single()
        );
    },

    async delete(id) {
        return handleResponse(
            supabase.from('Listing').delete().eq('id', id)
        );
    }
};

// ============ BOOKINGS API ============

export const bookings = {
    async list(params = {}) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        let query = supabase.from('Booking')
            .select('*, listing:Listing(*)')
            .eq('userId', user.id)
            .order('checkIn', { ascending: true });

        if (params.limit) {
            query = query.limit(Number(params.limit));
        }

        return handleResponse(query);
    },

    async get(id) {
        return handleResponse(
            supabase.from('Booking').select('*, listing:Listing(*)').eq('id', id).single()
        );
    },

    async create(data) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const bookingData = { ...data, userId: user.id, status: 'PENDING' };
        return handleResponse(
            supabase.from('Booking').insert(bookingData).select().single()
        );
    },

    async cancel(id) {
        return handleResponse(
            supabase.from('Booking').update({ status: 'CANCELLED' }).eq('id', id).select().single()
        );
    },

    async getHostBookings() {
        const { data: { user } } = await supabase.auth.getUser();
        // Complex join: Find bookings where Listing.hostId == user.id
        // Supabase JS doesn't support deep nested filtering easily in one go without simplified views or RPC.
        // For now, let's fetch listings owned by host, then bookings for those listings.

        const { data: listings } = await supabase.from('Listing').select('id').eq('hostId', user.id);
        const listingIds = listings.map(l => l.id);

        return handleResponse(
            supabase.from('Booking')
                .select('*, listing:Listing(*), user:User(*)')
                .in('listingId', listingIds)
                .order('createdAt', { ascending: false })
        );
    }
};

// ============ REVIEWS API ============

export const reviews = {
    async list(listingId) {
        return handleResponse(
            supabase.from('Review').select('*, user:User(*)').eq('listingId', listingId)
        );
    },

    async create(listingId, rating, comment) {
        const { data: { user } } = await supabase.auth.getUser();
        const reviewData = {
            userId: user.id,
            listingId,
            rating,
            comment
        };
        return handleResponse(
            supabase.from('Review').insert(reviewData).select().single()
        );
    }
};

// ============ FAVORITES API ============

export const favorites = {
    async list() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return []; // Return empty if not logged in

        return handleResponse(
            supabase.from('Favorite')
                .select('*, listing:Listing(*)')
                .eq('userId', user.id)
        );
    },

    async add(listingId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        return handleResponse(
            supabase.from('Favorite').insert({ userId: user.id, listingId })
        );
    },

    async remove(listingId) {
        const { data: { user } } = await supabase.auth.getUser();

        return handleResponse(
            supabase.from('Favorite').delete().eq('userId', user.id).eq('listingId', listingId)
        );
    },

    async toggle(listingId, isFavorited) {
        if (isFavorited) {
            return this.remove(listingId);
        }
        return this.add(listingId);
    }
};

// ============ USERS API ============

export const users = {
    async get(id) {
        return handleResponse(
            supabase.from('User').select('*').eq('id', id).single()
        );
    },

    async update(data) {
        const { data: { user } } = await supabase.auth.getUser();
        return handleResponse(
            supabase.from('User').update(data).eq('id', user.id).select().single()
        );
    },

    async becomeHost() {
        const { data: { user } } = await supabase.auth.getUser();
        return handleResponse(
            supabase.from('User').update({ isHost: true }).eq('id', user.id).select().single()
        );
    }
};

// Helper for checking auth state
export const isAuthenticated = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
};

export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

export default {
    auth,
    listings,
    bookings,
    reviews,
    favorites,
    users,
    isAuthenticated,
    getCurrentUser
};
