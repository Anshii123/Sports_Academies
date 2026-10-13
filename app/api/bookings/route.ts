import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createBooking, getBookingsByUserId, findUserById } from "@/lib/store";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const bookings = await getBookingsByUserId(session.userId);
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Get bookings error:", err.message);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required to book academy services." },
        { status: 401 }
      );
    }

    const user = await findUserById(session.userId);
    const body = await req.json();
    const { type, title, sport, date, timeSlot, experienceLevel, notes, details } = body;

    if (!type || !title || !sport) {
      return NextResponse.json(
        { error: "Service type, title, and sport are required." },
        { status: 400 }
      );
    }

    const newBooking = await createBooking({
      userId: session.userId,
      userName: user?.name || session.name,
      userEmail: user?.email || session.email,
      userPhone: user?.phone || "N/A",
      type: type || "TRIAL",
      title,
      sport,
      date: date || new Date().toISOString().split("T")[0],
      timeSlot: timeSlot || "4:30 PM - 6:30 PM",
      experienceLevel: experienceLevel || "Intermediate",
      notes: notes || "",
      details: details || {},
    });

    return NextResponse.json(
      { message: "Booking confirmed successfully!", booking: newBooking },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Create booking error:", err.message);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
