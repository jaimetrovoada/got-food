import { AppDataSource } from "../data-source";
import { User } from "./user";
import { Restaurant } from "./restaurant";
import { Order } from "./order";
import { Menu } from "./menu";

export const userRepository = AppDataSource.getRepository(User);
export const restaurantRepository = AppDataSource.getRepository(Restaurant);
export const orderRepository = AppDataSource.getRepository(Order);
export const menuRepository = AppDataSource.getRepository(Menu);
