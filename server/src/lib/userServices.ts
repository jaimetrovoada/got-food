import { AppDataSource } from "../data-source";
import { User } from "../model/user";

const userRepository = AppDataSource.getRepository(User);

export async function get(id: string) {
  const user = await userRepository.findOneBy({ id: id });
  return user;
}

export async function getUserWithPassword(email: string) {
  const user = await userRepository
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .addSelect("user.passwordHash")
    .getOne();

  return user;
}

export async function getRestaurants(id: string) {
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      restaurants: true,
    },
  });

  return user.restaurants;
}

export async function getOrders(id: string) {
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      orders: true,
    },
  });

  return user.orders;
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
    passwordHash?: string;
    role?: "business" | "customer";
  }
) {
  const res = await userRepository.update(id, body);
  return res;
}
