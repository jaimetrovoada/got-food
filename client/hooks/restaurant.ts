import axios from "axios";
import config from "@/utils/config";
import useSWR from "swr";
import { IRestaurant, IMenuItem, IOrder } from "@/types";

export const useRestaurants = () => {
  const fetcher = (url: string) =>
    axios.get<IRestaurant[]>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    `${config.BACKEND_URL}/api/restaurants`,
    fetcher
  );
  return {
    restaurants: data,
    isLoading,
    isError: error,
  };
};

export const useRestaurant = (restaurantId: string) => {
  const fetcher = (url: string) =>
    axios.get<IRestaurant>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}`,
    fetcher
  );

  return {
    restaurant: data,
    isLoading,
    isError: error,
  };
};

export const useRestaurantMenu = (restaurantId: string) => {
  const fetcher = (url: string) =>
    axios.get<IMenuItem[]>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}/menu`,
    fetcher
  );

  return {
    menu: data,
    isLoading,
    isError: error,
  };
};

export const useRestaurantOrders = (restaurantId: string) => {
  const fetcher = (url: string) =>
    axios.get<IOrder[]>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}/orders`,
    fetcher
  );

  return {
    orders: data,
    isLoading,
    isError: error,
  };
};
