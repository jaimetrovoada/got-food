import axios from "axios";
import config from "@/utils/config";
import { IRestaurant, IMenuItem } from "@/types";

const createRestaurant = async (
  token: string,
  payload: {
    name: string;
    description: string;
    address: string;
    logo: File | undefined;
  }
) => {
  console.log({ token, payload });
  const res = await axios.post(
    `${config.BACKEND_URL}/api/restaurants`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return {
    restaurant: res.data,
    status: res.status,
  };
};

const getRestaurants = async () => {
  const res = await axios.get<IRestaurant[]>(
    `${config.BACKEND_URL}/api/restaurants`
  );
  return {
    restaurants: res.data,
    status: res.status,
  };
};

const getRestaurant = async (restaurantId: string) => {
  const res = await axios.get<IRestaurant>(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}`
  );
  return {
    restaurant: res.data,
    status: res.status,
  };
};

const getMenu = async (restaurantId: string) => {
  const res = await axios.get<IMenuItem[]>(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}/menu`
  );
  return {
    menu: res.data,
    status: res.status,
  };
};

const getTrendingRestaurants = async () => {
  const res = await axios.get<IRestaurant[]>(
    `${config.BACKEND_URL}/api/restaurants/trending`
  );
  return {
    restaurants: res.data,
    status: res.status,
  };
};

const addMenuItem = async (
  token: string,
  restaurantId: string,
  payload: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: File | undefined;
  }
) => {
  console.log({ payload });
  const res = await axios.post(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}/menu`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return {
    menuItem: res.data,
    status: res.status,
  };
};

const placeOrder = async (
  restaurantId: string,
  token: string,
  items: {
    item: string;
    amount: number;
  }[],
  totalPrice: number
) => {
  const res = await axios.post(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}/order`,
    {
      tableNumber: 1,
      items,
      totalPrice,
      status: "pending",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    order: res.data,
    status: res.status,
  };
};

const updateOrder = async (restaurantId: string, orderId: string) => {
  const res = await axios.put(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}/order/${orderId}`,
    {
      status: "fullfilled",
    }
  );
  return {
    order: res.data,
    status: res.status,
  };
};

const deleteMenuItem = async (
  token: string,
  restaurantId: string,
  itemId: string
) => {
  const res = await axios.delete(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}/menu/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    message: res.data,
    status: res.status,
  };
};

const deleteRestaurant = async (token: string, restaurantId: string) => {
  const res = await axios.delete(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    message: res.data,
    status: res.status,
  };
};

export default {
  getRestaurants,
  getRestaurant,
  getMenu,
  getTrendingRestaurants,
  createRestaurant,
  addMenuItem,
  placeOrder,
  updateOrder,
  deleteMenuItem,
  deleteRestaurant,
};
