-- Wrapped in transaction for atomicity
BEGIN;

-- Validating data: Remove invalid bookings that would violate the new constraint
-- This ensures the CHECK constraint can be applied successfully
DELETE FROM "Booking" WHERE "checkOut" <= "checkIn";

-- Alter Listing price to Decimal
ALTER TABLE "Listing" ALTER COLUMN "price" TYPE DECIMAL(10, 2);

-- Alter Booking columns to Decimal
ALTER TABLE "Booking" ALTER COLUMN "nightlyRate" TYPE DECIMAL(10, 2);
ALTER TABLE "Booking" ALTER COLUMN "cleaningFee" TYPE DECIMAL(10, 2);
ALTER TABLE "Booking" ALTER COLUMN "serviceFee" TYPE DECIMAL(10, 2);
ALTER TABLE "Booking" ALTER COLUMN "taxes" TYPE DECIMAL(10, 2);
ALTER TABLE "Booking" ALTER COLUMN "totalPrice" TYPE DECIMAL(10, 2);

-- Update Booking -> Listing Foreign Key to RESTRICT
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_listingId_fkey";
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add CHECK Constraint for Dates
ALTER TABLE "Booking" ADD CONSTRAINT "check_dates" CHECK ("checkOut" > "checkIn");

COMMIT;
