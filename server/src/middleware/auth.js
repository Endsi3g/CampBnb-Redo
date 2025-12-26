/**
 * Authentication Middleware
 */
import { verifyToken } from '../utils/jwt.js';
import prisma from '../config/database.js';

/**
 * Require authentication
 */
export async function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                isHost: true,
                isSuperCamper: true
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

/**
 * Optional authentication - attaches user if token exists
 */
export async function optionalAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);

            if (decoded) {
                const user = await prisma.user.findUnique({
                    where: { id: decoded.userId },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        avatar: true,
                        isHost: true,
                        isSuperCamper: true
                    }
                });

                req.user = user;
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}

/**
 * Require host role
 */
export function requireHost(req, res, next) {
    if (!req.user?.isHost) {
        return res.status(403).json({ error: 'Host access required' });
    }
    next();
}
