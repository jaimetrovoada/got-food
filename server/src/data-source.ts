import { DataSource } from "typeorm";
import config from "./utils/config";
import { Menu } from "./model/menu";
import { User } from "./model/user";
import { Restaurant } from "./model/restaurant";
import { Order } from "./model/order";

export const AppDataSource = new DataSource({
  type: "postgres",
  /*  ssl: {
    ca: config.DATABASE_SSL,
  }, */
  url: config.DATABASE_URL,
  entities: [Order, Menu, Restaurant, User],
  synchronize: true,
  logging: true,
});
