import { Request } from "express";
import { nanoid } from "nanoid/async";
import { bucket } from "../app";
import bcrypt from "bcrypt";

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

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
