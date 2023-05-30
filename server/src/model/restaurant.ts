import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { Menu } from "./menu";
import { Order } from "./order";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  logo: string;

  @OneToMany(() => Menu, (menu) => menu.restaurant, {
    cascade: true,
    nullable: true,
  })
  menuItems: Menu[];

  @ManyToOne(() => User, (user) => user.restaurants)
  owner: User;

  @OneToMany(() => Order, (order) => order.restaurant, {
    cascade: true,
    nullable: true,
  })
  orders: Order[];
}
