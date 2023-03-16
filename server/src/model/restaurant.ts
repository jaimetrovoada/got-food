import mongoose, { Document, Model } from "mongoose";

const Schema = mongoose.Schema;

interface IRestaurant extends Document {
  name: string;
  description: string;
  address: string;
}

const RestaurantSchema = new Schema({
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
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
