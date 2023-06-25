import * as z from "zod";

export const registerRequestValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["business", "customer"]).default("customer"),
});

export const loginRequestValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const restaurantRequestValidator = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  address: z.string().nonempty(),
  logo: z.custom<File>((v) => v instanceof File),
});

export const menuRequestValidator = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  category: z.string(),
  image: z.instanceof(File),
});

export const orderRequestValidator = z.object({
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
