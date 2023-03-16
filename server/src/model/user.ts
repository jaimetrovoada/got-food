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

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model<IUser & Document>("User", userSchema);

export default User;
