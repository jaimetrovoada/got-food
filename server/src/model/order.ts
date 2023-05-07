import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

interface IOrderedItems {
  item: mongoose.Types.ObjectId;
  amount: number;
}

export interface IOrder extends Document {
  restaurant: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  tableNumber: string;
  orderedItems: IOrderedItems[];
  totalPrice: number;
  date: Date;
  status: "pending" | "fullfilled";
}

const orderSchema = new Schema<IOrder>({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tableNumber: {
    type: String,
    required: true,
  },
  orderedItems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "fullfilled"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
