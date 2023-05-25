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
  orderId: string;
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
  orderId: {
    type: String,
  },
});

orderSchema.pre<IOrder>("save", async function (next) {
  if (!this.orderId) {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    console.log({ today, date: this.date });

    const highestOrderId = await Order.findOne({ date: { $gte: today } })
      .sort("-orderId")
      .select("orderId")
      .lean();

    console.log({ highestOrderId });
    let newOrderId = `${year}${month}${day}001`;

    if (highestOrderId && highestOrderId.orderId) {
      const highestOrderIdNumber = parseInt(highestOrderId.orderId.slice(-3));
      newOrderId = `${year}${month}${day}${(highestOrderIdNumber + 1)
        .toString()
        .padStart(3, "0")}`;
    }

    this.orderId = newOrderId;
  }

  next();
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
