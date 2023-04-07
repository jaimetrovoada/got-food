import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: "customer" | "business";
  restaurants?: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
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
    delete returnedObject.passwordHash;
    if (returnedObject.role !== "business") {
      delete returnedObject.restaurants;
    }
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
