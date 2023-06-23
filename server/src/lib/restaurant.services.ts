import { string } from "zod";
import { AppDataSource } from "../data-source";
import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";

const restaurantRepository = AppDataSource.getRepository(Restaurant);

export async function get(id: string) {
  const restaurant = await restaurantRepository.findOneBy({ id });

  return restaurant;
}

export async function getAll() {
  const restaurants = await restaurantRepository.find({});
  return restaurants;
}

export async function getByOrders() {
  const restaurants = await restaurantRepository.find({
    relations: {
      orders: true,
    },
  });

  return restaurants;
}

export async function create(
  user: User,
  body: {
    name: string;
    description: string;
    address: string;
    logo: string;
  }
) {
  const restaurant = new Restaurant();
  restaurant.name = body.name;
  restaurant.description = body.description;
  restaurant.address = body.address;
  restaurant.logo = body.logo;
  restaurant.owner = user;

  const res = await restaurantRepository.save(restaurant);

  return res;
}

export async function update(
  id: string,
  body: {
    name?: string;
    description?: string;
    address?: string;
    logo?: string;
  }
) {
  const res = await restaurantRepository.update(id, body);
  return res;
}

export async function remove(id: string) {
  const res = await restaurantRepository.delete(id);
  return res;
}
