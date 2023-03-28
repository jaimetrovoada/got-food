import mongoose, { Document, Model } from "mongoose";

const Schema = mongoose.Schema;

export interface IRestaurant {
  name: string;
  description: string;
  address: string;
  menuItems: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  logo: string;
}

const restaurantSchema = new Schema<IRestaurant>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  menuItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

restaurantSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
