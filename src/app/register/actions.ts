"use server";

import { db } from "@/db";
import { users, customerProfiles, driverProfiles, vehicleOwners } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function registerUser(data: any) {
  const { name, email, password, role } = data;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { success: false, error: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [user] = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    }).returning();

    // Create profile based on role
    if (user.role === "customer") {
      await db.insert(customerProfiles).values({
        userId: user.id,
      });
    } else if (user.role === "driver") {
      await db.insert(driverProfiles).values({
        userId: user.id,
        licenseNumber: "PENDING",
      });
    } else if (user.role === "owner") {
      await db.insert(vehicleOwners).values({
        userId: user.id,
      });
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create user" };
  }
}
