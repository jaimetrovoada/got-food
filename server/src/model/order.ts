import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Menu } from "./menu";
import { Restaurant } from "./restaurant";
import { User } from "./user";

export type OrderStatus = "pending" | "completed";
@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tableNumber: number;

  @Column("jsonb")
  orderedItems: { item: Menu; amount: number }[];

  @Column()
  totalPrice: number;

  @Column({
    type: "enum",
    enum: ["pending", "completed"],
    default: "completed",
  })
  status: OrderStatus;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column()
  orderId: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
