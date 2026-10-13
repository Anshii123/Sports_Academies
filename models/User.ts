import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: "USER" | "ADMIN";
  preferredSport: string;
  age: number;
  avatar?: string;
  membership?: {
    plan: "NONE" | "STARTER" | "PERFORMANCE" | "ELITE";
    status: "ACTIVE" | "PENDING" | "EXPIRED";
    billingCycle: "MONTHLY" | "ANNUAL";
    startDate?: Date;
    expiryDate?: Date;
  };
  metrics?: {
    sessionsCompleted: number;
    attendanceRate: number;
    fitnessScore: number;
    techniqueScore: number;
    tacticalScore: number;
    enduranceScore: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    preferredSport: { type: String, default: "Football" },
    age: { type: Number, required: true },
    avatar: { type: String, default: "" },
    membership: {
      plan: { type: String, enum: ["NONE", "STARTER", "PERFORMANCE", "ELITE"], default: "NONE" },
      status: { type: String, enum: ["ACTIVE", "PENDING", "EXPIRED"], default: "ACTIVE" },
      billingCycle: { type: String, enum: ["MONTHLY", "ANNUAL"], default: "MONTHLY" },
      startDate: { type: Date, default: Date.now },
      expiryDate: { type: Date },
    },
    metrics: {
      sessionsCompleted: { type: Number, default: 14 },
      attendanceRate: { type: Number, default: 92 },
      fitnessScore: { type: Number, default: 86 },
      techniqueScore: { type: Number, default: 88 },
      tacticalScore: { type: Number, default: 82 },
      enduranceScore: { type: Number, default: 90 },
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
