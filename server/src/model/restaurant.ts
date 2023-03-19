import mongoose, { Document, Model } from "mongoose";

const Schema = mongoose.Schema;

// TODO: add field for image path
export interface IRestaurant extends Document {
  name: string;
  description: string;
  address: string;
  menu: string[];
  owner: string;
}

const restaurantSchema = new Schema({
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
  menu: [
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
