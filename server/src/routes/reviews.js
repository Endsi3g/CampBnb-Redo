/**
 * Reviews Routes
 */
import { Router } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { parsePagination, paginateResponse } from '../utils/pagination.js';

const router = Router();

// Validation schema
const createReviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(10, 'Review must be at least 10 characters')
});

/**
 * GET /api/reviews/listing/:listingId
 * Get reviews for a listing
 */
router.get('/listing/:listingId', async (req, res, next) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);

        const where = { listingId: req.params.listingId };

        const [reviews, total] = await Promise.all([
            prisma.review.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    user: { select: { id: true, name: true, avatar: true } }
                }
            }),
            prisma.review.count({ where })
        ]);

        res.json(paginateResponse(reviews, total, { page, limit }));
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/reviews/listing/:listingId
 * Create a review for a listing
 */
router.post('/listing/:listingId', requireAuth, validate(createReviewSchema), async (req, res, next) => {
    try {
        const { listingId } = req.params;
        const { rating, comment } = req.body;

        // Check listing exists
        const listing = await prisma.listing.findUnique({
            where: { id: listingId }
        });

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        // Check if user has completed booking
        const hasBooking = await prisma.booking.findFirst({
            where: {
                userId: req.user.id,
                listingId,
                status: 'COMPLETED'
            }
        });

        // For now, allow reviews without completed booking (can be stricter later)

        // Check if user already reviewed
        const existing = await prisma.review.findFirst({
            where: { userId: req.user.id, listingId }
        });

        if (existing) {
            return res.status(409).json({ error: 'You already reviewed this listing' });
        }

        // Create review
        const review = await prisma.review.create({
            data: {
                userId: req.user.id,
                listingId,
                rating,
                comment
            },
            include: {
                user: { select: { id: true, name: true, avatar: true } }
            }
        });

        // Update listing rating
        const stats = await prisma.review.aggregate({
            where: { listingId },
            _avg: { rating: true },
            _count: { rating: true }
        });

        await prisma.listing.update({
            where: { id: listingId },
            data: {
                rating: stats._avg.rating || 0,
                reviewCount: stats._count.rating
            }
        });

        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
});

export default router;
