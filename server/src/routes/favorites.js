/**
 * Favorites Routes
 */
import { Router } from 'express';
import prisma from '../config/database.js';
import { requireAuth } from '../middleware/auth.js';
import { parsePagination, paginateResponse } from '../utils/pagination.js';

const router = Router();

/**
 * GET /api/favorites
 * Get user's favorited listings
 */
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);

        const where = { userId: req.user.id };

        const [favorites, total] = await Promise.all([
            prisma.favorite.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    listing: {
                        include: {
                            host: { select: { id: true, name: true, avatar: true } }
                        }
                    }
                }
            }),
            prisma.favorite.count({ where })
        ]);

        // Flatten to return listings with isFavorited
        const listings = favorites.map(f => ({
            ...f.listing,
            isFavorited: true,
            favoritedAt: f.createdAt
        }));

        res.json(paginateResponse(listings, total, { page, limit }));
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/favorites/:listingId
 * Add listing to favorites
 */
router.post('/:listingId', requireAuth, async (req, res, next) => {
    try {
        const { listingId } = req.params;

        // Check listing exists
        const listing = await prisma.listing.findUnique({
            where: { id: listingId }
        });

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        // Create favorite (will error if duplicate due to unique constraint)
        const favorite = await prisma.favorite.create({
            data: {
                userId: req.user.id,
                listingId
            }
        });

        res.status(201).json({ message: 'Added to favorites', listingId });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Already in favorites' });
        }
        next(error);
    }
});

/**
 * DELETE /api/favorites/:listingId
 * Remove listing from favorites
 */
router.delete('/:listingId', requireAuth, async (req, res, next) => {
    try {
        const { listingId } = req.params;

        await prisma.favorite.delete({
            where: {
                userId_listingId: {
                    userId: req.user.id,
                    listingId
                }
            }
        });

        res.json({ message: 'Removed from favorites', listingId });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Not in favorites' });
        }
        next(error);
    }
});

export default router;
