import { API } from "./constants";
import { IRestaurant, IMenuItem, OrderRequest } from "@/types";
import { getUser } from "./auth.service";

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
    const res = await fetch(API.restaurants, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(payload),
    });

    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const getRestaurants = async () => {
  try {
    const res = await fetch(API.restaurants, { cache: "no-store" });
    const restaurants: IRestaurant[] = await res.json();

    return [restaurants, null] as [IRestaurant[], null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const getRestaurant = async (restaurantId: string) => {
  try {
    const res = await fetch(`${API.restaurants}/${restaurantId}`, {
      cache: "no-store",
    });
    const restaurant: IRestaurant = await res.json();

    return [restaurant, null] as [IRestaurant, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const getMenu = async (restaurantId: string) => {
  try {
    const res = await fetch(`${API.restaurants}/${restaurantId}/menu`, {
      cache: "no-store",
    });
    const menu: IMenuItem[] = await res.json();

    return [menu, null] as [IMenuItem[], null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const getTrendingRestaurants = async () => {
  try {
    const res = await fetch(`${API.trending}`, { cache: "no-store" });
    const trending: IRestaurant[] = await res.json();

    return [trending, null] as [IRestaurant[], null];
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
    const res = await fetch(`${API.restaurants}/${restaurantId}/menu`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(payload),
    });

    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const placeOrder = async (
  restaurantId: string,
  token: string,
  payload: OrderRequest
) => {
  try {
    const res = await fetch(`${API.restaurants}/${restaurantId}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const updateOrder = async (restaurantId: string, orderId: string) => {
  try {
    const user = await getUser();
    const res = await fetch(
      `${API.restaurants}/${restaurantId}/order/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          status: "fullfilled",
        }),
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
    const res = await fetch(
      `${API.restaurants}/${restaurantId}/menu/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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
    const res = await fetch(`${API.restaurants}/${restaurantId}`, {
      method: "DELETE",
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
