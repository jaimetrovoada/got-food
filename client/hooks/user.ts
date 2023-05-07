import axios from "axios";
import useSWR from "swr";
import config from "@/utils/config";
import { IUserDetails, IUserRestaurants, IOrder } from "@/types";


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
