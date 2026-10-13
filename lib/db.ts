import mongoose from "mongoose";

// Only connect to MongoDB if a real URI is explicitly provided in environment variables.
// If MONGODB_URI is not provided (standalone demo / serverless deployment without Atlas),
// connectDB immediately returns null without network blocking.
const MONGODB_URI = process.env.MONGODB_URI;

interface CachedMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: CachedMongoose | undefined;
}

let cached: CachedMongoose = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose | null> {
  // Standalone demo mode: no URI provided or dummy placeholder
  if (!MONGODB_URI || MONGODB_URI.trim() === "" || MONGODB_URI.includes("<password>")) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn("MongoDB Atlas connection notice (using standalone hardcoded store):", err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch {
    cached.promise = null;
    cached.conn = null;
  }

  return cached.conn;
}

