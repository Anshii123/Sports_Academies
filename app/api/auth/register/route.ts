import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/store";
import { hashPassword, signToken, TOKEN_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password, age, preferredSport } = body;

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Phone, Password)." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const parsedAge = age ? parseInt(age, 10) : 18;

    const newUser = await createUser({
      name,
      email,
      phone,
      passwordHash,
      role: "USER",
      age: isNaN(parsedAge) ? 18 : parsedAge,
      preferredSport: preferredSport || "Football",
    });

    const token = signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      preferredSport: newUser.preferredSport,
    });

    const userPayload = {
      userId: newUser._id.toString(),
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      preferredSport: newUser.preferredSport,
      age: newUser.age,
      membership: newUser.membership,
      metrics: newUser.metrics,
    };

    const response = NextResponse.json(
      { message: "Registration successful", user: userPayload },
      { status: 201 }
    );

    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Register error:", err.message);
    return NextResponse.json({ error: "Server error during registration." }, { status: 500 });
  }
}
