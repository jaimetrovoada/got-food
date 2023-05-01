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
  const res = await axios.get<Restaurant[]>(
    `${config.BACKEND_URL}/api/restaurants`
  );
  return {
    restaurants: res.data,
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

const getRestaurant = async (restaurantId: string) => {
  const res = await axios.get<Restaurant>(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}`
  );
  return {
    restaurant: res.data,
    status: res.status,
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

const getMenu = async (restaurantId: string) => {
  const res = await axios.get<MenuItem[]>(
    `${config.BACKEND_URL}/api/restaurants/${restaurantId}/menu`
  );
  return {
    menu: res.data,
    status: res.status,
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

export default {
  getRestaurants,
  createRestaurant,
  addMenuItem,
  useRestaurants,
  getMenu,
  useRestaurantMenu,
  getRestaurant,
  useRestaurant,
  placeOrder,
};
