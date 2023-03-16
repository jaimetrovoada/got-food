import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

// TODO: add restaurants field, optional only for business role
interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer" | "business";
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model<IUser & Document>("User", userSchema);

export default User;
