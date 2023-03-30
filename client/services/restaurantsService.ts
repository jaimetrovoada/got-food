import axios from "axios";
import useSWR from "swr";

interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  menuItems: [];
  owner: {
    name: string;
    email: string;
  };
  logo: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const createRestaurant = async (payload: {
  name: string;
  description: string;
  address: string;
  logo: File | undefined;
}) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  console.log({ token, payload });
  const res = await axios.post("http://localhost:3001/restaurants", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return {
    restaurant: res.data,
    status: res.status,
  };
};

const useRestaurants = () => {
  const fetcher = (url: string) =>
    axios.get<Restaurant[]>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    "http://localhost:3001/restaurants",
    fetcher
  );
  return {
    restaurants: data,
    isLoading,
    isError: error,
  };
};

const useRestaurantMenu = (restaurantId: string) => {
  const fetcher = (url: string) =>
    axios.get<MenuItem[]>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    `http://localhost:3001/restaurants/${restaurantId}/menu`,
    fetcher
  );

  return {
    menu: data,
    isLoading,
    isError: error,
  };
};

export default { createRestaurant, useRestaurants, useRestaurantMenu };
