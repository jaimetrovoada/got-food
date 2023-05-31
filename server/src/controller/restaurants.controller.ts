import { NextFunction, Request, Response } from "express";
import { User } from "../model/user";
import { Restaurant } from "../model/restaurant";
import { Order } from "../model/order";
import { uploadToFirebase } from "../lib/helpers";
import { createOrderId } from "../lib/orderServices";
import { OrderSchema } from "../lib/schemas";
import { AppDataSource } from "../data-source";
import * as restaurantServices from "../lib/restaurantServices";
import * as menuServices from "../lib/menuServices";

const restaurantRepository = AppDataSource.getRepository(Restaurant);
const orderRepository = AppDataSource.getRepository(Order);
const userRepository = AppDataSource.getRepository(User);

export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurants = await restaurantServices.getAll();

    return res.json(restaurants);
  } catch (err) {
    return next(err);
  }
};

export const getTrendingRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurants = await restaurantServices.getByOrders();

    // .filter((restaurant) => restaurant.orders.length > 0)
    const top5 = restaurants
      .sort((a, b) => {
        return b.orders.length - a.orders.length;
      })
      .slice(0, 5);

    return res.json(top5);
  } catch (err) {
    return next(err);
  }
};

export const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await restaurantServices.get(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.json(restaurant);
  } catch (err) {
    return next(err);
  }
};

export const getRestaurantMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menu = await menuServices.get(req.params.id);

    return res.json(menu);
  } catch (err) {
    return next(err);
  }
};

export const getRestaurantOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await restaurantServices.getOrders(req.params.id);

    return res.json(orders);
  } catch (err) {
    return next(err);
  }
};

export const getRestaurantOrdersStream = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const stream = await orderRepository
    .createQueryBuilder("order")
    .where("order.restaurantId = :id", { id: req.params.id })
    .andWhere("order.status = :status", { status: "pending" })
    .stream();

  const sendEvent = (order) => {
    res.write(`data: ${JSON.stringify(order)}\n\n`);
  };

  const sendStreamClosedEvent = () => {
    res.write("event: streamClosed\ndata: Stream closed\n\n");
    res.end();
  };

  stream.on("data", sendEvent);
  stream.on("close", sendStreamClosedEvent);
  stream.on("error", (error) => {
    sendStreamClosedEvent();
    next(error);
  });
};

export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    const firebaseImgUrl = await uploadToFirebase(req);

    const result = await restaurantServices.create(user, {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      logo: firebaseImgUrl as string,
    });

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
};

export const createMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const firebaseImgUrl = await uploadToFirebase(req);

    const restaurant = await restaurantServices.get(req.params.id);

    const result = await menuServices.create(restaurant, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: firebaseImgUrl as string,
    });

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vOrder = OrderSchema.parse({
      tableNumber: req.body.tableNumber,
      orderedItems: req.body.items,
      totalPrice: req.body.totalPrice,
      status: req.body.status,
    });

    const user = await userRepository.findOneBy({
      id: req.user.id,
    });
    const restaurant = await restaurantRepository.findOneBy({
      id: req.params.id,
    });
    const order = new Order();
    order.tableNumber = vOrder.tableNumber;
    order.totalPrice = vOrder.totalPrice;
    order.status = vOrder.status;
    order.orderedItems = req.body.items;
    order.orderId = await createOrderId(req.params.id);
    order.restaurant = restaurant;
    order.user = user;

    const result = orderRepository.save(order);

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const logo = req.file ? ((await uploadToFirebase(req)) as string) : null;

    const result = await restaurantServices.update(req.params.id, {
      name: req.body?.name,
      description: req.body?.description,
      address: req.body?.address,
      logo: logo,
    });

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const updateMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { menuId } = req.params;
  try {
    const imgUrl = req.file ? ((await uploadToFirebase(req)) as string) : null;

    const result = await menuServices.update(menuId, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: imgUrl,
    });

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orderId } = req.params;
  try {
    const order = await orderRepository.findOneBy({
      id: orderId,
    });

    const vOrderStatus = OrderSchema.shape.status.parse(req.body.status);
    order.status = vOrderStatus;
    const updatedOrder = await orderRepository.save(order);

    return res.json(updatedOrder);
  } catch (err) {
    return next(err);
  }
};
