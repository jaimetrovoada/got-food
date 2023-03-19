import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

// TODO: add restaurants field, optional only for business role
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer" | "business";
  restaurants?: string[];
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: false,
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
