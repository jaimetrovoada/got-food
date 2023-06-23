import { AppDataSource } from "../data-source";
import { Order } from "../model/order";
import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";

const orderRepository = AppDataSource.getRepository(Order);
const restaurantRepository = AppDataSource.getRepository(Restaurant);

async function createOrderId(restaurantId: string): Promise<string> {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  // Count the number of orders made today
  const count = await orderRepository
    .createQueryBuilder("order")
    .where("order.restaurantId = :id", { id: restaurantId })
    .andWhere("order.date BETWEEN :startDate AND :endDate", {
      startDate,
      endDate,
    })
    .getCount();

  // Generate the order ID based on the date and order count
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const orderCount = (count + 1).toString().padStart(4, "0");

  const orderId = `${year}${month}${day}-${orderCount}`;

  return orderId;
}

export async function get(id: string) {
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

export async function stream(id: string) {
  const stream = await orderRepository
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.user", "user")
    .leftJoinAndSelect("order.restaurant", "restaurant")
    .where("order.restaurant = :id", { id: id })
    .andWhere("order.status = :status", { status: "pending" })
    .stream();

  return stream;
}

export async function create(
  user: User,
  restaurantId: string,
  body: {
    tableNumber: number;
    totalPrice: number;
    status: "pending" | "completed";
    orderedItems: {
      item: string;
      amount: number;
    }[];
  }
) {
  const order = orderRepository.create({
    tableNumber: body.tableNumber,
    totalPrice: body.totalPrice,
    status: body.status,
    orderedItems: body.orderedItems,
    orderId: await createOrderId(restaurantId),
    user: user,
    restaurant: {
      id: restaurantId,
    },
  });

  const res = await orderRepository.save(order);

  return res;
}

export async function update(id: string, status: "pending" | "completed") {
  const res = await orderRepository.update(id, { status });
  return res;
}

export async function remove(id: string) {
  const res = await orderRepository.delete(id);
  return res;
}
