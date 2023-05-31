import { AppDataSource } from "../data-source";
import { Menu } from "../model/menu";
import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";

const menuRepository = AppDataSource.getRepository(Menu);
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

export async function getMenu(id: string) {
  const restaurant = await restaurantRepository.findOne({
    where: {
      id: id,
    },
    relations: ["menuItems"],
  });

  return restaurant.menuItems;
}

export async function getOrders(id: string) {
  const restaurant = await restaurantRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      orders: true,
    },
  });

  return restaurant.orders;
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

export async function createItem(
  restaurant: Restaurant,
  body: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }
) {
  const menuItem = new Menu();
  menuItem.name = body.name;
  menuItem.description = body.description;
  menuItem.price = body.price;
  menuItem.category = body.category;
  menuItem.image = body.image;
  menuItem.restaurant = restaurant;

  const res = await menuRepository.save(menuItem);
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

export async function updateItem(
  id: string,
  body: {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    image?: string;
  }
) {
  const res = await menuRepository.update(id, body);
  return res;
}
