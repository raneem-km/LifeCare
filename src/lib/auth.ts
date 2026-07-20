import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "c8e6a5789f2134b791e846013a21b34c56789e0123456789abcdef0123456789";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface AdminPayload {
  username: string;
  role: "admin";
}

/**
 * Creates a signed JWT token valid for 8 hours
 */
export async function signAdminToken(username: string): Promise<string> {
  return await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secretKey);
}

/**
 * Verifies the JWT token signature and expiration
 */
export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as AdminPayload;
  } catch (error) {
    return null;
  }
}
