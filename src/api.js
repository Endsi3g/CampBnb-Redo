/**
 * CampBnB API Client
 * Handles all backend API communication
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Get auth token from localStorage
 */
function getToken() {
    return localStorage.getItem('campbnb_token');
}

/**
 * Set auth token in localStorage
 */
export function setToken(token) {
    localStorage.setItem('campbnb_token', token);
}

/**
 * Remove auth token
 */
export function clearToken() {
    localStorage.removeItem('campbnb_token');
    localStorage.removeItem('campbnb_user');
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser() {
    const user = localStorage.getItem('campbnb_user');
    return user ? JSON.parse(user) : null;
}

/**
 * Set current user in localStorage
 */
export function setCurrentUser(user) {
    localStorage.setItem('campbnb_user', JSON.stringify(user));
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
    return !!getToken();
}

/**
 * Make API request with authentication
 */
async function apiRequest(endpoint, options = {}) {
    const token = getToken();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        },
        ...options
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ============ AUTH API ============

export const auth = {
    async register(email, password, name) {
        const data = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name })
        });
        setToken(data.token);
        setCurrentUser(data.user);
        return data;
    },

    async login(email, password) {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        setToken(data.token);
        setCurrentUser(data.user);
        return data;
    },

    async me() {
        const data = await apiRequest('/auth/me');
        setCurrentUser(data.user);
        return data.user;
    },

    async forgotPassword(email) {
        return apiRequest('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    },

    logout() {
        clearToken();
        window.location.hash = '/signin';
    }
};

// ============ LISTINGS API ============

export const listings = {
    async search(params = {}) {
        const query = new URLSearchParams(params).toString();
        return apiRequest(`/listings${query ? `?${query}` : ''}`);
    },

    async getHostListings(params = {}) {
        const query = new URLSearchParams(params).toString();
        return apiRequest(`/listings/host${query ? `?${query}` : ''}`);
    },

    async get(id) {
        return apiRequest(`/listings/${id}`);
    },

    async create(data) {
        return apiRequest('/listings', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async update(id, data) {
        return apiRequest(`/listings/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async delete(id) {
        return apiRequest(`/listings/${id}`, { method: 'DELETE' });
    }
};

// ============ BOOKINGS API ============

export const bookings = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return apiRequest(`/bookings${query ? `?${query}` : ''}`);
    },

    async get(id) {
        return apiRequest(`/bookings/${id}`);
    },

    async create(data) {
        return apiRequest('/bookings', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async cancel(id) {
        return apiRequest(`/bookings/${id}/cancel`, { method: 'PUT' });
    },

    async getHostBookings(params = {}) {
        const query = new URLSearchParams(params).toString();
        return apiRequest(`/bookings/host${query ? `?${query}` : ''}`);
    },

    async confirm(id) {
        return apiRequest(`/bookings/${id}/confirm`, { method: 'PUT' });
    },

    async reject(id) {
        return apiRequest(`/bookings/${id}/reject`, { method: 'PUT' });
    }
};

// ============ REVIEWS API ============

export const reviews = {
    async list(listingId, params = {}) {
        const query = new URLSearchParams(params).toString();
        return apiRequest(`/reviews/listing/${listingId}${query ? `?${query}` : ''}`);
    },

    async create(listingId, rating, comment) {
        return apiRequest(`/reviews/listing/${listingId}`, {
            method: 'POST',
            body: JSON.stringify({ rating, comment })
        });
    }
};

// ============ FAVORITES API ============

export const favorites = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return apiRequest(`/favorites${query ? `?${query}` : ''}`);
    },

    async add(listingId) {
        return apiRequest(`/favorites/${listingId}`, { method: 'POST' });
    },

    async remove(listingId) {
        return apiRequest(`/favorites/${listingId}`, { method: 'DELETE' });
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
        return apiRequest(`/users/${id}`);
    },

    async update(data) {
        const res = await apiRequest('/users/me', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        // Update stored user
        setCurrentUser(res.user); // Assuming the API returns { user: updatedUser }
        return res.user;
    },

    async becomeHost() {
        const res = await apiRequest('/users/me/become-host', {
            method: 'PUT'
        });
        const currentUser = getCurrentUser();
        // Update stored user
        if (currentUser) {
            setCurrentUser({ ...currentUser, isHost: true });
        }
        return res;
    }
};

// Export default API object
export default {
    auth,
    listings,
    bookings,
    reviews,
    favorites,
    users,
    isAuthenticated,
    getCurrentUser,
    clearToken
};
