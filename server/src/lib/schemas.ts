import { z } from "zod";

export const PriceSchema = z.coerce.number();
export const MenuItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string().url(),
});

export const RestaurantSchema = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  menuItems: z.array(MenuItemSchema).optional(),
  logo: z.string().url(),
});

export const OrderSchema = z.object({
  tableNumber: z.number(),
  orderedItems: z.array(
    z.object({
      item: z.string(),
      amount: z.number(),
    })
  ),
  totalPrice: z.number(),
  status: z.enum(["pending", "completed"]),
});

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  role: z.enum(["customer", "business"]),
});
export const UpdateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .nullable()
    .optional(),
  role: z.enum(["customer", "business"]),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
