import { z } from "zod";

export const priceSchema = z.coerce.number();
export const MenuItem = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string().url(),
});

export const Restaurant = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  menuItems: z.array(MenuItem).optional(),
  logo: z.string().url(),
});

export const Order = z.object({
  tableNumber: z.number(),
  orderedItems: z.array(
    z.object({
      item: z.string(),
      amount: z.number(),
    })
  ),
  totalPrice: z.number(),
  status: z.enum(["pending", "fullfilled"]),
});

export const Register = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  role: z.enum(["customer", "business"]),
});
export const Update = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .nullable()
    .optional(),
  role: z.enum(["customer", "business"]),
});

export const Login = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
