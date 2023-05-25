import axios from "axios";
import config from "@/utils/config";
import useSWR from "swr";
import { IRestaurant, IMenuItem, IOrder } from "@/types";
import { useState, useEffect } from "react";

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
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3001/api/restaurants/${restaurantId}/data-stream`
    );

    eventSource.onmessage = (event) => {
      const order = JSON.parse(event.data);
      setOrders((prevOrders) => [...prevOrders, order]);
    };

    eventSource.onerror = (error) => {
      console.error("Error in SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [restaurantId]);

  return orders;
};
