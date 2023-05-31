import { NextFunction, Request, Response } from "express";
import { uploadToFirebase } from "../lib/helpers";
import * as menuServices from "../lib/menuServices";
import * as orderServices from "../lib/orderServices";
import * as restaurantServices from "../lib/restaurantServices";

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
    const orders = await orderServices.get(req.params.id);

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

  const stream = await orderServices.stream(req.params.id);

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
  const { user } = req;
  try {
    const restaurant = await restaurantServices.get(req.params.id);

    const result = orderServices.create(user, restaurant, req.body);

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
    const result = await orderServices.update(orderId, req.body.status);

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await restaurantServices.remove(req.params.id);

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

export const deleteMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await menuServices.remove(req.params.id);

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await orderServices.remove(req.params.id);

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};
