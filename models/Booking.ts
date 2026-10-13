import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH";
  title: string;
  sport: string;
  date?: string;
  timeSlot?: string;
  experienceLevel?: string;
  notes?: string;
  status: "CONFIRMED" | "PENDING" | "COMPLETED" | "CANCELLED";
  details?: Record<string, unknown>;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    type: {
      type: String,
      enum: ["TRIAL", "CAMP", "PROGRAM", "MEMBERSHIP", "FACILITY", "COACH"],
      required: true,
    },
    title: { type: String, required: true },
    sport: { type: String, required: true },
    date: { type: String },
    timeSlot: { type: String },
    experienceLevel: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: ["CONFIRMED", "PENDING", "COMPLETED", "CANCELLED"],
      default: "CONFIRMED",
    },
    details: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
