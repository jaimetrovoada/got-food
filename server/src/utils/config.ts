import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGODB_URI:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  FIREBASE_BUCKET: process.env.FIREBASE_BUCKET,
};

export default config;
