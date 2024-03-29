import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGODB_URI:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  FIREBASE_BUCKET: process.env.FIREBASE_BUCKET,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_SSL: process.env.DATABSE_SSL,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export default config;
