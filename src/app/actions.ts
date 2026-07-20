"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface BookingInput {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  reason: string;
  symptoms?: string;
  mode?: string;
  location?: string;
  time?: string;
  doctor?: string;
  date: string;
  status?: string;
}

export interface ReviewInput {
  name: string;
  rating: number;
  text: string;
}

/**
 * Sanitizes input text to prevent XSS attacks by stripping script tags and HTML markup
 */
function sanitizeInput(str: string): string {
  if (!str) return "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/**
 * Validates 10-digit mobile number format
 */
function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, "");
  return cleanPhone.length === 10;
}

/**
 * Validates email format using regex
 */
function isValidEmail(email: string): boolean {
  if (!email) return true; // Optional email field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Creates a new booking with input validation and XSS sanitization
 */
export async function createBooking(data: BookingInput) {
  try {
    if (!process.env.DATABASE_URL || !db) {
      console.warn("DATABASE_URL is not set");
      return { success: false, error: "Database not configured" };
    }

    // 1. Strict Phone Validation (10 digits)
    const cleanPhone = data.phone ? data.phone.replace(/\D/g, "") : "";
    if (!isValidPhone(cleanPhone)) {
      return { success: false, error: "Invalid mobile number. Please enter exactly 10 digits." };
    }

    // 2. Strict Email Validation
    if (data.email && !isValidEmail(data.email)) {
      return { success: false, error: "Invalid email format. Please enter a valid email address." };
    }

    // 3. XSS Sanitization
    const sanitizedFirstName = sanitizeInput(data.firstName);
    const sanitizedLastName = data.lastName ? sanitizeInput(data.lastName) : undefined;
    const sanitizedReason = sanitizeInput(data.reason);
    const sanitizedSymptoms = data.symptoms ? sanitizeInput(data.symptoms) : undefined;
    const sanitizedMode = data.mode ? sanitizeInput(data.mode) : undefined;
    const sanitizedLocation = data.location ? sanitizeInput(data.location) : undefined;
    const sanitizedTime = data.time ? sanitizeInput(data.time) : undefined;

    const booking = await db.booking.create({
      data: {
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName || null,
        phone: cleanPhone,
        email: data.email ? sanitizeInput(data.email) : null,
        reason: sanitizedReason,
        symptoms: sanitizedSymptoms || null,
        mode: sanitizedMode || null,
        location: sanitizedLocation || null,
        time: sanitizedTime || null,
        doctor: data.doctor ? sanitizeInput(data.doctor) : null,
        date: data.date,
        status: data.status || "Pending",
        isDeleted: false,
      },
    });

    revalidatePath("/admin");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Failed to book appointment" };
  }
}

/**
 * Creates a new review in the database and triggers page revalidation
 */
export async function submitReview(data: ReviewInput) {
  try {
    if (!process.env.DATABASE_URL || !db) {
      console.warn("DATABASE_URL is not set");
      return { success: false, error: "Database not configured" };
    }

    const sanitizedName = sanitizeInput(data.name);
    const sanitizedText = sanitizeInput(data.text);

    const review = await db.review.create({
      data: {
        name: sanitizedName,
        rating: Math.min(5, Math.max(1, data.rating)),
        text: sanitizedText,
      },
    });

    revalidatePath("/");
    return { success: true, review };
  } catch (error) {
    console.error("Failed to submit review:", error);
    return { success: false, error: "Failed to submit review" };
  }
}

/**
 * Fetches all reviews from the database
 */
export async function getReviews() {
  try {
    if (!process.env.DATABASE_URL || !db) {
      return [];
    }
    return await db.review.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
}

/**
 * Fetches active (non-deleted) patient bookings from the database
 */
export async function getBookings() {
  try {
    if (!process.env.DATABASE_URL || !db) {
      return [];
    }
    return await db.booking.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

/**
 * Updates booking status (Pending, Confirmed, Completed, Cancelled)
 */
export async function updateBookingStatus(id: number, status: string) {
  try {
    if (!process.env.DATABASE_URL || !db) {
      return { success: false, error: "Database not configured" };
    }
    const updated = await db.booking.update({
      where: { id },
      data: { status: sanitizeInput(status) },
    });
    revalidatePath("/admin");
    return { success: true, booking: updated };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

/**
 * Soft deletes a booking by updating isDeleted = true (preserves record safely in PostgreSQL database)
 */
export async function softDeleteBooking(id: number) {
  try {
    if (!process.env.DATABASE_URL || !db) {
      return { success: false, error: "Database not configured" };
    }
    await db.booking.update({
      where: { id },
      data: { isDeleted: true },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to soft delete booking:", error);
    return { success: false, error: "Failed to delete booking" };
  }
}

/**
 * Permanent deletion helper for reviews
 */
export async function deleteReview(id: number) {
  try {
    if (!process.env.DATABASE_URL || !db) {
      return { success: false, error: "Database not configured" };
    }
    await db.review.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false, error: "Failed to delete review" };
  }
}
