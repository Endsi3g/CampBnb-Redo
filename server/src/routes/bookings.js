/**
 * Bookings Routes
 */
import { Router } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { parsePagination, paginateResponse } from '../utils/pagination.js';

const router = Router();

// Validation schemas
const createBookingSchema = z.object({
    listingId: z.string().cuid(),
    checkIn: z.string().datetime(),
    checkOut: z.string().datetime(),
    adults: z.number().int().min(1).default(1),
    children: z.number().int().min(0).default(0),
    infants: z.number().int().min(0).default(0),
    pets: z.number().int().min(0).default(0)
});

/**
 * GET /api/bookings
 * Get current user's bookings
 */
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);
        const { status } = req.query;

        const where = { userId: req.user.id };
        if (status) where.status = status;

        const [bookings, total] = await Promise.all([
            prisma.booking.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    listing: {
                        select: {
                            id: true,
                            title: true,
                            location: true,
                            images: true,
                            price: true
                        }
                    }
                }
            }),
            prisma.booking.count({ where })
        ]);

        res.json(paginateResponse(bookings, total, { page, limit }));
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/bookings/host
 * Get bookings for listings owned by current user
 */
router.get('/host', requireAuth, async (req, res, next) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);
        const { status } = req.query;

        // Find listings owned by user
        const listings = await prisma.listing.findMany({
            where: { hostId: req.user.id },
            select: { id: true }
        });

        const listingIds = listings.map(l => l.id);

        const where = { listingId: { in: listingIds } };
        if (status) where.status = status;

        const [bookings, total] = await Promise.all([
            prisma.booking.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    user: {
                        select: { id: true, name: true, avatar: true, email: true }
                    },
                    listing: {
                        select: { id: true, title: true }
                    }
                }
            }),
            prisma.booking.count({ where })
        ]);

        res.json(paginateResponse(bookings, total, { page, limit }));
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/bookings/:id
 * Get booking details
 */
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: req.params.id },
            include: {
                listing: {
                    include: {
                        host: { select: { id: true, name: true, avatar: true, phone: true } }
                    }
                }
            }
        });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Check ownership
        if (booking.userId !== req.user.id && booking.listing.hostId !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        res.json(booking);
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/bookings
 * Create a new booking
 */
router.post('/', requireAuth, validate(createBookingSchema), async (req, res, next) => {
    try {
        const { listingId, checkIn, checkOut, adults, children, infants, pets } = req.body;

        // Get listing
        const listing = await prisma.listing.findUnique({
            where: { id: listingId }
        });

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        // Check guest count
        const totalGuests = adults + children;
        if (totalGuests > listing.maxGuests) {
            return res.status(400).json({
                error: `Maximum ${listing.maxGuests} guests allowed`
            });
        }

        // Calculate dates and pricing
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        if (nights < 1) {
            return res.status(400).json({ error: 'Check-out must be after check-in' });
        }

        const nightlyRate = listing.price;
        const subtotal = nightlyRate * nights;
        const cleaningFee = 35; // Fixed for now
        const serviceFee = Math.round(subtotal * 0.12); // 12% service fee
        const taxes = Math.round(subtotal * 0.13); // 13% tax
        const totalPrice = subtotal + cleaningFee + serviceFee + taxes;

        // Check for conflicting bookings
        const conflict = await prisma.booking.findFirst({
            where: {
                listingId,
                status: { in: ['PENDING', 'CONFIRMED'] },
                OR: [
                    { checkIn: { lte: checkOutDate }, checkOut: { gte: checkInDate } }
                ]
            }
        });

        if (conflict) {
            return res.status(409).json({ error: 'Dates not available' });
        }

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                userId: req.user.id,
                listingId,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                guests: totalGuests,
                adults,
                children,
                infants,
                pets,
                nightlyRate,
                cleaningFee,
                serviceFee,
                taxes,
                totalPrice,
                status: 'CONFIRMED'
            },
            include: {
                listing: {
                    select: { id: true, title: true, location: true, images: true }
                }
            }
        });

        res.status(201).json(booking);
    } catch (error) {
        next(error);
    }
});

/**
 * PUT /api/bookings/:id/cancel
 * Cancel a booking
 */
router.put('/:id/cancel', requireAuth, async (req, res, next) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: req.params.id }
        });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        if (booking.userId !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        if (booking.status === 'CANCELLED') {
            return res.status(400).json({ error: 'Booking already cancelled' });
        }

        if (booking.status === 'COMPLETED') {
            return res.status(400).json({ error: 'Cannot cancel completed booking' });
        }

        const updated = await prisma.booking.update({
            where: { id: req.params.id },
            data: { status: 'CANCELLED' }
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
});

/**
 * PUT /api/bookings/:id/confirm
 * Host confirms a booking
 */
router.put('/:id/confirm', requireAuth, async (req, res, next) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: req.params.id },
            include: { listing: true }
        });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        if (booking.listing.hostId !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updated = await prisma.booking.update({
            where: { id: req.params.id },
            data: { status: 'CONFIRMED' }
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
});

/**
 * PUT /api/bookings/:id/reject
 * Host rejects a booking
 */
router.put('/:id/reject', requireAuth, async (req, res, next) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: req.params.id },
            include: { listing: true }
        });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        if (booking.listing.hostId !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updated = await prisma.booking.update({
            where: { id: req.params.id },
            data: { status: 'CANCELLED' }
            // Note: We might want a separate 'REJECTED' status, but for now CANCELLED works
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
});

export default router;
