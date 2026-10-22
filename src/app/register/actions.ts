"use server";

import { db } from "@/db";
import { users, customerProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const schema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name."),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterState = { error?: string };

export async function registerAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details and try again." };
  }

  const { name, email, password } = parsed.data;

  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) {
    return { error: "An account with this email already exists. Try signing in instead." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [user] = await db
      .insert(users)
      .values({ name, email, password: hashedPassword, role: "customer" })
      .returning();

    await db.insert(customerProfiles).values({ userId: user.id });
  } catch (error) {
    console.error("register failed", error);
    return { error: "We could not create your account. Please try again." };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/post-login" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but sign-in failed. Please log in manually." };
    }
    throw error;
  }

  return {};
}
