import mongoose, { Document } from "mongoose";

interface IMenu extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  restaurant: string;
}

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  restaurant: { type: String, required: true },
});

menuSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Menu = mongoose.model<IMenu>("Menu", menuSchema);

export default Menu;
