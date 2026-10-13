import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { findUserById } from "@/lib/store";
import { DEMO_USER } from "@/lib/demoUser";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    let user;
    if (session.userId === DEMO_USER._id || session.userId === "demo_athlete_001") {
      user = DEMO_USER;
    } else {
      user = await findUserById(session.userId);
    }

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

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

    return NextResponse.json({ user: userPayload }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Auth me check error:", err.message);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
