/**
 * Database Seed Script
 * Seeds sample data for development
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
    'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800',
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
    'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
    'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'
];

const AMENITIES = [
    'Fire Pit', 'Fast WiFi', 'Kitchen', 'Parking', 'Lake Access',
    'Hot Tub', 'BBQ Grill', 'Pet Friendly', 'Stargazing', 'Hiking Trails'
];

async function seed() {
    console.log('🌱 Seeding database...');

    // Clean existing data
    await prisma.favorite.deleteMany();
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.listing.deleteMany();
    await prisma.user.deleteMany();

    // Create users
    const passwordHash = await bcrypt.hash('password123', 12);

    const users = await Promise.all([
        prisma.user.create({
            data: {
                email: 'alex@example.com',
                passwordHash,
                name: 'Alex B.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
                isSuperCamper: true
            }
        }),
        prisma.user.create({
            data: {
                email: 'host@example.com',
                passwordHash,
                name: 'Sarah M.',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
                isHost: true
            }
        }),
        prisma.user.create({
            data: {
                email: 'host2@example.com',
                passwordHash,
                name: 'Mike T.',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
                isHost: true
            }
        })
    ]);

    console.log(`✓ Created ${users.length} users`);

    // Create listings
    const listings = await Promise.all([
        prisma.listing.create({
            data: {
                title: 'Whispering Pines A-Frame',
                description: 'Escape to this stunning A-frame cabin nestled in the heart of Banff. Wake up to panoramic mountain views and fall asleep under a blanket of stars. Perfect for couples or small families seeking adventure.',
                type: 'CABIN',
                price: 129,
                location: 'Banff, Alberta',
                latitude: 51.1784,
                longitude: -115.5708,
                province: 'Alberta',
                images: [SAMPLE_IMAGES[0], SAMPLE_IMAGES[1]],
                amenities: ['Fire Pit', 'Fast WiFi', 'Kitchen', 'Stargazing', 'Hiking Trails'],
                maxGuests: 4,
                bedrooms: 1,
                beds: 2,
                bathrooms: 1,
                rating: 4.92,
                reviewCount: 47,
                isSuperhost: true,
                hostId: users[1].id
            }
        }),
        prisma.listing.create({
            data: {
                title: 'Lakefront Glamping Dome',
                description: 'Experience luxury camping in our geodesic dome overlooking crystal-clear lake waters. Includes a private dock, kayaks, and outdoor shower. The ultimate glamping experience.',
                type: 'GLAMPING',
                price: 189,
                location: 'Jasper, Alberta',
                latitude: 52.8737,
                longitude: -118.0814,
                province: 'Alberta',
                images: [SAMPLE_IMAGES[2], SAMPLE_IMAGES[3]],
                amenities: ['Lake Access', 'Hot Tub', 'BBQ Grill', 'Pet Friendly', 'Stargazing'],
                maxGuests: 2,
                bedrooms: 1,
                beds: 1,
                bathrooms: 1,
                rating: 4.85,
                reviewCount: 32,
                isSuperhost: false,
                hostId: users[1].id
            }
        }),
        prisma.listing.create({
            data: {
                title: 'Cozy Mountain Yurt',
                description: 'Traditional Mongolian yurt with modern amenities. Located on 5 private acres with stunning mountain views. Perfect for a digital detox getaway.',
                type: 'YURT',
                price: 85,
                location: 'Canmore, Alberta',
                latitude: 51.0884,
                longitude: -115.3479,
                province: 'Alberta',
                images: [SAMPLE_IMAGES[4], SAMPLE_IMAGES[5]],
                amenities: ['Fire Pit', 'Hiking Trails', 'Pet Friendly', 'Parking'],
                maxGuests: 4,
                bedrooms: 1,
                beds: 2,
                bathrooms: 0.5,
                rating: 4.78,
                reviewCount: 18,
                isSuperhost: true,
                hostId: users[2].id
            }
        }),
        prisma.listing.create({
            data: {
                title: 'Rustic Riverside Tent',
                description: 'Get back to basics with our safari-style tent on the riverbank. Includes comfortable beds, solar lighting, and access to shared facilities.',
                type: 'TENT',
                price: 65,
                location: 'Revelstoke, BC',
                latitude: 51.0,
                longitude: -118.2,
                province: 'British Columbia',
                images: [SAMPLE_IMAGES[1], SAMPLE_IMAGES[0]],
                amenities: ['Fire Pit', 'Pet Friendly', 'Parking', 'Lake Access'],
                maxGuests: 2,
                bedrooms: 1,
                beds: 1,
                bathrooms: 0,
                rating: 4.65,
                reviewCount: 24,
                isSuperhost: false,
                hostId: users[2].id
            }
        }),
        prisma.listing.create({
            data: {
                title: 'Oceanview RV Spot',
                description: 'Premium RV spot with full hookups and stunning Pacific Ocean views. Walking distance to beach and hiking trails.',
                type: 'RV_SPOT',
                price: 55,
                location: 'Tofino, BC',
                latitude: 49.1530,
                longitude: -125.9066,
                province: 'British Columbia',
                images: [SAMPLE_IMAGES[3], SAMPLE_IMAGES[2]],
                amenities: ['Parking', 'Fast WiFi', 'BBQ Grill', 'Pet Friendly'],
                maxGuests: 6,
                bedrooms: 0,
                beds: 0,
                bathrooms: 0,
                rating: 4.88,
                reviewCount: 56,
                isSuperhost: true,
                hostId: users[1].id
            }
        }),
        prisma.listing.create({
            data: {
                title: 'Treehouse Retreat',
                description: 'Live your childhood dream in this magical treehouse 20 feet above the forest floor. Features a wraparound deck and skylight for stargazing.',
                type: 'TREEHOUSE',
                price: 175,
                location: 'Whistler, BC',
                latitude: 50.1163,
                longitude: -122.9574,
                province: 'British Columbia',
                images: [SAMPLE_IMAGES[5], SAMPLE_IMAGES[4]],
                amenities: ['Stargazing', 'Hiking Trails', 'Kitchen', 'Fast WiFi'],
                maxGuests: 2,
                bedrooms: 1,
                beds: 1,
                bathrooms: 1,
                rating: 4.95,
                reviewCount: 89,
                isSuperhost: true,
                hostId: users[2].id
            }
        })
    ]);

    console.log(`✓ Created ${listings.length} listings`);

    // Create some reviews
    const reviews = await Promise.all([
        prisma.review.create({
            data: {
                rating: 5,
                comment: 'Absolutely stunning location! The A-frame was even better than the photos. Sarah was a wonderful host.',
                userId: users[0].id,
                listingId: listings[0].id
            }
        }),
        prisma.review.create({
            data: {
                rating: 4,
                comment: 'Great glamping experience. The dome was cozy and the lake views were incredible. Would definitely come back!',
                userId: users[0].id,
                listingId: listings[1].id
            }
        })
    ]);

    console.log(`✓ Created ${reviews.length} reviews`);

    // Create a favorite
    await prisma.favorite.create({
        data: {
            userId: users[0].id,
            listingId: listings[0].id
        }
    });

    // Create a booking
    await prisma.booking.create({
        data: {
            userId: users[0].id,
            listingId: listings[0].id,
            checkIn: new Date('2025-01-15'),
            checkOut: new Date('2025-01-17'),
            guests: 2,
            adults: 2,
            children: 0,
            nightlyRate: 129,
            cleaningFee: 35,
            serviceFee: 31,
            taxes: 34,
            totalPrice: 358,
            status: 'CONFIRMED'
        }
    });

    console.log('✓ Created sample booking and favorite');
    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Test accounts:');
    console.log('   Guest: alex@example.com / password123');
    console.log('   Host:  host@example.com / password123');
}

seed()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
