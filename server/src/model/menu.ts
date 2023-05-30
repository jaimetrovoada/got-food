import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurant } from "./restaurant";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  image: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems)
  restaurant: Restaurant;
}
