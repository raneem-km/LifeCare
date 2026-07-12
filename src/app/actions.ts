"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface BookingInput {
  firstName: string;
  lastName?: string;
  phone: string;
  reason: string;
  doctor?: string;
  date: string;
}

export interface ReviewInput {
  name: string;
  rating: number;
  text: string;
}

/**
 * Creates a new booking in the SQLite database
 */
export async function createBooking(data: BookingInput) {
  try {
    const booking = await db.booking.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName || null,
        phone: data.phone,
        reason: data.reason,
        doctor: data.doctor || null,
        date: data.date,
      },
    });
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Failed to book appointment" };
  }
}

/**
 * Creates a new review in the SQLite database and triggers page revalidation
 */
export async function submitReview(data: ReviewInput) {
  try {
    const review = await db.review.create({
      data: {
        name: data.name,
        rating: data.rating,
        text: data.text,
      },
    });
    // Revalidate the home page to update testimonials dynamically
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
    return await db.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
}
