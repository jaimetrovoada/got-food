import axios from "axios";
import { API } from "./constants";
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
  try {
    const res = await axios.post(API.restaurants, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const getRestaurants = async () => {
  try {
    const res = await axios.get<IRestaurant[]>(API.restaurants);
    return [res.data, null] as [IRestaurant[], null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const getRestaurant = async (restaurantId: string) => {
  try {
    const res = await axios.get<IRestaurant>(
      `${API.restaurants}/${restaurantId}`
    );
    return [res.data, null] as [IRestaurant, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const getMenu = async (restaurantId: string) => {
  try {
    const res = await axios.get<IMenuItem[]>(
      `${API.restaurants}/${restaurantId}/menu`
    );
    return [res.data, null] as [IMenuItem[], null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const getTrendingRestaurants = async () => {
  try {
    const res = await axios.get<IRestaurant[]>(`${API.trending}`);
    return [res.data, null] as [IRestaurant[], null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
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
  try {
    const res = await axios.post(
      `${API.restaurants}/${restaurantId}/menu`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const placeOrder = async (
  restaurantId: string,
  token: string,
  items: {
    item: string;
    amount: number;
  }[],
  totalPrice: number,
  tableNumber: number
) => {
  try {
    const res = await axios.post(
      `${API.restaurants}/${restaurantId}/order`,
      {
        tableNumber,
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

    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const updateOrder = async (restaurantId: string, orderId: string) => {
  try {
    const res = await axios.put(
      `${API.restaurants}/${restaurantId}/order/${orderId}`,
      {
        status: "fullfilled",
      }
    );
    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const deleteMenuItem = async (
  token: string,
  restaurantId: string,
  itemId: string
) => {
  try {
    const res = await axios.delete(
      `${API.restaurants}/${restaurantId}/menu/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const deleteRestaurant = async (token: string, restaurantId: string) => {
  try {
    const res = await axios.delete(`${API.restaurants}/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
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
