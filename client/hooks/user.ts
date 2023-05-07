import axios from "axios";
import useSWR from "swr";
import config from "@/utils/config";

interface IUserRestaurants {
  id: string;
  name: string;
}
interface IUserDetails {
  id: string;
  name: string;
  email: string;
  restaurants: IUserRestaurants[];
  role: "customer" | "business";
}

export interface IOrder {
  restaurant: IUserRestaurants;
  orderedItems: OrderedItem[];
  totalPrice: number;
  date: Date;
  id: string;
  status: string;
  tableNumber: string;
}

interface OrderedItem {
  item: Item;
  amount: number;
  _id: string;
}

interface Item {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  restaurant: string;
  id: string;
}

export const useUserDetails = (id: string) => {
  const fetcher = (url: string) =>
    axios.get<IUserDetails>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    `${config.BACKEND_URL}/api/users/${id}`,
    fetcher
  );
  return {
    user: data,
    isLoading,
    error,
  };
};

export const useUserRestaurants = (id: string) => {
  const fetcher = (url: string) =>
    axios.get<IUserRestaurants[]>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    `${config.BACKEND_URL}/api/users/${id}/restaurants`,
    fetcher
  );

  return {
    restaurants: data,
    isLoading,
    error,
  };
};

export const useUserOrders = (id: string) => {
  const fetcher = (url: string) =>
    axios.get<IOrder[]>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    `${config.BACKEND_URL}/api/users/${id}/orders`,
    fetcher
  );
  return {
    orders: data,
    isLoading,
    error,
  };
};