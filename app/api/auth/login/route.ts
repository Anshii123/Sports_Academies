import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/store";
import { DEMO_USER, isDemoEmail } from "@/lib/demoUser";
import { verifyPassword, signToken, TOKEN_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Direct fail-safe check for demo user account (guaranteed offline / without Atlas)
    let user;
    if (isDemoEmail(normalizedEmail)) {
      user = DEMO_USER;
    } else {
      user = await findUserByEmail(normalizedEmail);
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials. Account not found." },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials. Incorrect password." },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      preferredSport: user.preferredSport,
    });

    const userPayload = {
      userId: user._id.toString(),
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      preferredSport: user.preferredSport,
      age: user.age,
      membership: user.membership,
      metrics: user.metrics,
    };

    const response = NextResponse.json(
      { message: "Login successful", user: userPayload },
      { status: 200 }
    );

    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Login error:", err.message);
    return NextResponse.json({ error: "Server error during login." }, { status: 500 });
  }
}
