import { User } from "../model/user";
import { hashPassword } from "./helpers";
import {
  userRepository,
  restaurantRepository,
  orderRepository,
} from "../model/repos";

export async function get(id: string) {
  const user = await userRepository.findOneBy({ id: id });
  return user;
}

export async function getUserWithPassword(email: string) {
  const user = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.restaurants", "restaurant")
    .select(["restaurant.id", "restaurant.name", "user"])
    .where("user.email = :email", { email: email })
    .addSelect("user.passwordHash")
    .getOne();

  return user;
}

export async function getRestaurants(id: string) {
  const restaurants = await restaurantRepository.find({
    where: {
      owner: {
        id: id,
      },
    },
  });

  return restaurants;
}

export async function getOrders(id: string) {
  const orders = await orderRepository.find({
    where: {
      user: {
        id: id,
      },
    },
  });

  return orders;
}

export async function create({
  name,
  email,
  passwordHash,
  role,
}: {
  name: string;
  email: string;
  passwordHash: string;
  role: "business" | "customer";
}) {
  const user = new User();
  user.name = name;
  user.email = email;
  user.passwordHash = passwordHash;
  user.role = role;

  const res = await userRepository.save(user);
  return res;
}

export async function update(
  id: string,
  body: {
    name?: string;
    email?: string;
    password?: string;
    role?: "business" | "customer";
  }
) {
  const passwordHash = body.password
    ? await hashPassword(body.password)
    : undefined;

  const updateBody = {
    name: body.name,
    email: body.email,
    role: body.role,
    passwordHash: passwordHash,
  };

  const res = await userRepository.update(id, updateBody);
  return res;
}

export async function remove(id: string) {
  const res = await userRepository.delete(id);
  return res;
}
