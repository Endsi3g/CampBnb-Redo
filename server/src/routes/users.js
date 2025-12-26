/**
 * Users Routes
 */
import { Router } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Validation schema
const updateProfileSchema = z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    avatar: z.string().url().optional()
});

/**
 * GET /api/users/:id
 * Get public user profile
 */
router.get('/:id', async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
            select: {
                id: true,
                name: true,
                avatar: true,
                isHost: true,
                isSuperCamper: true,
                createdAt: true,
                _count: {
                    select: {
                        listings: true,
                        reviews: true,
                        bookings: { where: { status: 'COMPLETED' } }
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * PUT /api/users/me
 * Update current user's profile
 */
router.put('/me', requireAuth, validate(updateProfileSchema), async (req, res, next) => {
    try {
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: req.body,
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                phone: true,
                isHost: true,
                isSuperCamper: true
            }
        });

        res.json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * PUT /api/users/me/become-host
 * Upgrade user to host
 */
router.put('/me/become-host', requireAuth, async (req, res, next) => {
    try {
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: { isHost: true },
            select: {
                id: true,
                email: true,
                name: true,
                isHost: true
            }
        });

        res.json({ message: 'You are now a host!', user });
    } catch (error) {
        next(error);
    }
});

export default router;
