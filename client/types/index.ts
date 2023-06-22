import { z } from "zod";
import {
  loginRequestValidator,
  menuRequestValidator,
  orderRequestValidator,
  registerRequestValidator,
  restaurantRequestValidator,
} from "@/lib/shemas";

export interface IUserRestaurants {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface IUser {
  name: string;
  email: string;
  role: "customer" | "business";
  restaurants: string[];
  orders: string[];
  id: string;
  token: string;
}

export interface IOrder {
  restaurant: IUserRestaurants;
  orderedItems: IOrderedItem[];
  totalPrice: number;
  date: Date;
  id: string;
  status: string;
  tableNumber: string;
  orderId: string;
}

export interface IOrderedItem {
  item: string;
  amount: number;
}

export interface IRestaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  menuItems: IMenuItem[];
  owner: {
    name: string;
    email: string;
  };
  logo: string;
}

export interface IMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}
export enum UserRole {
  CUSTOMER = "customer",
  BUSINESS = "business",
}

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
