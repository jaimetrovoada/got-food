import { z } from "zod";

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
  name: z.string(),
  description: z.string(),
  address: z.string(),
  logo: z.string().url(),
});

export const menuRequestValidator = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  category: z.string(),
  image: z.string().url(),
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

export type RegisterRequest = z.infer<typeof registerRequestValidator>;

export type LoginRequest = z.infer<typeof loginRequestValidator>;

export type LoginResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
};

export type RestaurantRequest = z.infer<typeof restaurantRequestValidator>;

export type RestaurantResponse = RestaurantRequest & {
  id: string;
};

export type MenuRequest = z.infer<typeof menuRequestValidator>;

export type MenuResponse = MenuRequest & {
  id: string;
};

export type OrderRequest = z.infer<typeof orderRequestValidator>;

export type OrderResponse = OrderRequest & {
  id: string;
  user: string;
  restaurant: string;
  date: Date;
};
