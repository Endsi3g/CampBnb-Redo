/**
 * Listings Routes
 */
import { Router } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { validate, validateQuery } from '../middleware/validate.js';
import { requireAuth, optionalAuth, requireHost } from '../middleware/auth.js';
import { parsePagination, paginateResponse } from '../utils/pagination.js';

const router = Router();

// Listing types enum
const LISTING_TYPES = ['TENT', 'CABIN', 'RV_SPOT', 'GLAMPING', 'BACKCOUNTRY', 'TREEHOUSE', 'YURT'];

// Validation schemas
const createListingSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    type: z.enum(LISTING_TYPES),
    price: z.number().positive('Price must be positive'),
    location: z.string().min(3),
    latitude: z.number(),
    longitude: z.number(),
    province: z.string(),
    images: z.array(z.string().url()).min(1, 'At least one image required'),
    amenities: z.array(z.string()).default([]),
    maxGuests: z.number().int().positive().default(4),
    bedrooms: z.number().int().min(0).default(1),
    beds: z.number().int().positive().default(1),
    bathrooms: z.number().min(0).default(1)
});

/**
 * GET /api/listings
 * Search and filter listings
 */
router.get('/', optionalAuth, async (req, res, next) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);
        const { type, province, minPrice, maxPrice, guests, search, sort } = req.query;

        // Build where clause
        const where = { isActive: true };

        if (type && LISTING_TYPES.includes(type)) {
            where.type = type;
        }

        if (province) {
            where.province = province;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
        }

        if (guests) {
            where.maxGuests = { gte: parseInt(guests) };
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { location: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        // Build orderBy
        let orderBy = { createdAt: 'desc' };
        if (sort === 'price_asc') orderBy = { price: 'asc' };
        if (sort === 'price_desc') orderBy = { price: 'desc' };
        if (sort === 'rating') orderBy = { rating: 'desc' };

        // Query listings
        const [listings, total] = await Promise.all([
            prisma.listing.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    host: {
                        select: { id: true, name: true, avatar: true }
                    },
                    _count: { select: { reviews: true } }
                }
            }),
            prisma.listing.count({ where })
        ]);

        res.json(paginateResponse(listings, total, { page, limit }));
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/listings/host
 * Get listings for current host
 */
router.get('/host', requireAuth, async (req, res, next) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);

        const where = { hostId: req.user.id };

        const [listings, total] = await Promise.all([
            prisma.listing.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    reviews: { select: { rating: true } },
                    bookings: { select: { id: true, status: true, totalPrice: true } }
                }
            }),
            prisma.listing.count({ where })
        ]);

        res.json(paginateResponse(listings, total, { page, limit }));
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/listings/:id
 * Get listing details
 */

/**
 * GET /api/listings/:id
 * Get listing details
 */
router.get('/:id', optionalAuth, async (req, res, next) => {
    try {
        const listing = await prisma.listing.findUnique({
            where: { id: req.params.id },
            include: {
                host: {
                    select: { id: true, name: true, avatar: true, createdAt: true }
                },
                reviews: {
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: { select: { id: true, name: true, avatar: true } }
                    }
                },
                _count: { select: { reviews: true, bookings: true } }
            }
        });

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        // Check if favorited by current user
        let isFavorited = false;
        if (req.user) {
            const favorite = await prisma.favorite.findUnique({
                where: {
                    userId_listingId: {
                        userId: req.user.id,
                        listingId: listing.id
                    }
                }
            });
            isFavorited = !!favorite;
        }

        res.json({ ...listing, isFavorited });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/listings
 * Create a new listing (host only)
 */
router.post('/', requireAuth, requireHost, validate(createListingSchema), async (req, res, next) => {
    try {
        const listing = await prisma.listing.create({
            data: {
                ...req.body,
                hostId: req.user.id
            },
            include: {
                host: { select: { id: true, name: true, avatar: true } }
            }
        });

        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
});

/**
 * PUT /api/listings/:id
 * Update a listing
 */
router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        // Check ownership
        const listing = await prisma.listing.findUnique({
            where: { id: req.params.id }
        });

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        if (listing.hostId !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updated = await prisma.listing.update({
            where: { id: req.params.id },
            data: req.body
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
});

/**
 * DELETE /api/listings/:id
 * Delete a listing
 */
router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        // Check ownership
        const listing = await prisma.listing.findUnique({
            where: { id: req.params.id }
        });

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        if (listing.hostId !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await prisma.listing.delete({ where: { id: req.params.id } });

        res.json({ message: 'Listing deleted' });
    } catch (error) {
        next(error);
    }
});

export default router;
