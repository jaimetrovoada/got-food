import { Request } from "express";
import { nanoid } from "nanoid/async";
import { bucket } from "../app";
import { AppDataSource } from "../data-source";
import { Order } from "../model/order";

const orderRepository = AppDataSource.getRepository(Order);

function getExtensionFromMimeType(mimeType: string): string {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      throw new Error(`Unsupported mimetype: ${mimeType}`);
  }
}

function getContentTypeFromMimeType(mimeType: string): string {
  return mimeType;
}

export async function uploadToFirebase(req: Request) {
  const id = await nanoid();
  const mimeType = req.file.mimetype;
  const extension = getExtensionFromMimeType(mimeType);
  const contentType = getContentTypeFromMimeType(mimeType);

  const imgName = `${id}.${extension}`;

  const file = bucket.file(imgName);
  const firebaseImgUrlPromise = new Promise((resolve, reject) => {
    const stream = file.createWriteStream({ contentType });

    stream.on("error", (error) => {
      reject(error);
    });

    stream.on("finish", async () => {
      const firebaseImgUrl = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });

      resolve(firebaseImgUrl[0]);
    });

    stream.end(req.file.buffer);
  });
  const firebaseImgUrl = await firebaseImgUrlPromise;
  return firebaseImgUrl;
}

export async function createOrderId(restaurantId: string): Promise<string> {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  // Count the number of orders made today
  const count = await orderRepository
    .createQueryBuilder("order")
    .where("order.restaurantId = :id", { id: restaurantId })
    .andWhere("order.date BETWEEN :startDate AND :endDate", {
      startDate,
      endDate,
    })
    .getCount();

  // Generate the order ID based on the date and order count
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const orderCount = (count + 1).toString().padStart(4, "0");

  const orderId = `${year}${month}${day}-${orderCount}`;

  return orderId;
}
