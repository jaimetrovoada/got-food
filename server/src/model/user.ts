import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./order";
import { Restaurant } from "./restaurant";

export type UserRoleType = "business" | "customer";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: "enum",
    enum: ["business", "customer"],
    default: "customer",
  })
  role: UserRoleType;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner, {
    cascade: true,
    nullable: true,
  })
  restaurants: Restaurant[];

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    nullable: true,
  })
  orders: Order[];
}
