import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

interface IItem {
  item: mongoose.Types.ObjectId;
  amount: number;
}

interface IOrder extends Document {
  restaurant: mongoose.Types.ObjectId;
  tableNumber: string;
  items: IItem[];
  totalPrice: number;
  date: Date;
}

const orderSchema = new Schema<IOrder>({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  tableNumber: {
    type: String,
    required: true,
  },
  items: [
    {
      itemName: String,
      amount: Number,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
