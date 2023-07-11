import { Menu } from "../model/menu";
import { Restaurant } from "../model/restaurant";
import { menuRepository } from "../model/repos";

export async function get(id: string) {
  const menuItems = await menuRepository.find({
    where: {
      restaurant: {
        id: id,
      },
    },
  });

  return menuItems;
}

export async function create(
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
    price?: number;
    category?: string;
    image?: string;
  }
) {
  const res = await menuRepository.update(id, body);
  return res;
}

export async function remove(id: string) {
  const res = await menuRepository.delete(id);
  return res;
}
