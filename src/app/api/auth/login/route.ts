import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "LifeCareClinic@2026#SecureAdmin!";

    // Strict credential verification
    if (!username || !password || username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials. Authorized personnel only." },
        { status: 401 }
      );
    }

    // Generate secure JWT token
    const token = await signAdminToken(username);

    // Create JSON response
    const response = NextResponse.json(
      { success: true, message: "Authentication successful" },
      { status: 200 }
    );

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error during authentication" },
      { status: 500 }
    );
  }
}
