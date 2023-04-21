import axios from "axios";
import useSWR from "swr";
import config from "@/utils/config";

interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  menuItems: MenuItem[];
  owner: {
    name: string;
    email: string;
  };
  logo: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

let token: Record<string, any>;
if (typeof window !== "undefined") {
  token = JSON.parse(localStorage.getItem("token") || "{}")?.token;
}

const createRestaurant = async (payload: {
  name: string;
  description: string;
  address: string;
  logo: File | undefined;
}) => {
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

const useRestaurants = () => {
  const fetcher = (url: string) =>
    axios.get<Restaurant[]>(url).then((res) => res.data);

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

const useRestaurant = (restaurantId: string) => {
  const fetcher = (url: string) =>
    axios.get<Restaurant>(url).then((res) => res.data);

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

const useRestaurantMenu = (restaurantId: string) => {
  const fetcher = (url: string) =>
    axios.get<MenuItem[]>(url).then((res) => res.data);

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

const addMenuItem = async (
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

export default {
  createRestaurant,
  addMenuItem,
  useRestaurants,
  useRestaurantMenu,
  useRestaurant,
};
