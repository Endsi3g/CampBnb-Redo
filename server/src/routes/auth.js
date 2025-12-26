/**
 * Authentication Routes
 */
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../config/database.js';
import { generateToken } from '../utils/jwt.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Validation schemas
const registerSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters')
});

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required')
});

/**
 * POST /api/auth/register
 * Create a new user account
 */
router.post('/register', validate(registerSchema), async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        // Check if user exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: { email, passwordHash, name },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                isHost: true,
                isSuperCamper: true,
                createdAt: true
            }
        });

        // Generate token
        const token = generateToken(user.id);

        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post('/login', validate(loginSchema), async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Verify password
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                isHost: user.isHost,
                isSuperCamper: user.isSuperCamper
            },
            token
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
router.get('/me', requireAuth, async (req, res) => {
    res.json({ user: req.user });
});

/**
 * POST /api/auth/forgot-password
 * Send password reset email (stub for now)
 */
router.post('/forgot-password', async (req, res, next) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });

        // Always return success to prevent email enumeration
        res.json({
            message: 'If an account exists with this email, a reset link has been sent.'
        });
    } catch (error) {
        next(error);
    }
});

export default router;
