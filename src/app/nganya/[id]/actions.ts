"use server";

import { db } from "@/db";
import { bookings, driverAvailability, vehicles, customerProfiles } from "@/db/schema";
import { and, eq, gte, lte, or } from "drizzle-orm";
import { auth } from "@/auth";

export async function checkAvailability(vehicleId: string, driverId: string, date: Date) {
  const dateString = date.toISOString().split("T")[0];

  // 1. Check if driver has explicitly marked availability
  const specificAvailability = await db.query.driverAvailability.findFirst({
    where: and(
      eq(driverAvailability.driverId, driverId),
      eq(driverAvailability.date, dateString)
    ),
  });

  if (specificAvailability) {
    return { status: specificAvailability.isAvailable ? "available" : "unavailable" };
  }

  // 2. Check for existing confirmed bookings for this vehicle or driver on this date
  const existingBooking = await db.query.bookings.findFirst({
    where: and(
      or(eq(bookings.vehicleId, vehicleId), eq(bookings.driverId, driverId)),
      eq(bookings.status, "approved"),
      gte(bookings.startDate, new Date(dateString)),
      lte(bookings.endDate, new Date(dateString + "T23:59:59"))
    ),
  });

  if (existingBooking) {
    return { status: "unavailable" };
  }

  // 3. Otherwise it's pending (driver needs to confirm)
  return { status: "pending" };
}

export async function submitBooking(data: {
  vehicleId: string;
  driverId: string;
  date: Date;
  pickupLocation: string;
  destination: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "You must be logged in to book." };
  }

  // Get customer profile
  const profile = await db.query.customerProfiles.findFirst({
    where: eq(customerProfiles.userId, session.user.id),
  });

  if (!profile) {
    return { success: false, error: "Customer profile not found. Please complete your profile." };
  }

  // Get vehicle for price
  const vehicle = await db.query.vehicles.findFirst({
    where: eq(vehicles.id, data.vehicleId),
  });

  if (!vehicle) return { success: false, error: "Vehicle not found." };

  try {
    await db.insert(bookings).values({
      customerId: profile.id,
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      startDate: data.date,
      endDate: data.date, // Assuming 1 day for now
      pickupLocation: data.pickupLocation,
      destination: data.destination,
      totalPrice: vehicle.basePrice,
      status: "pending",
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create booking." };
  }
}
