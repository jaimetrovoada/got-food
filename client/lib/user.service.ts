import { getUser } from "./auth.service";
import { IOrder, IRestaurant } from "@/types";
import { API } from "./constants";

const getRestaurants = async (userId: string) => {
  try {
    const res = await fetch(`${API.users}/${userId}/restaurants`, {
      cache: "no-store",
    });

    const restaurants: IRestaurant[] = await res.json();
    return [restaurants, null] as [IRestaurant[], Error];
  } catch (error) {
    console.log({ error });

    return [null, error] as [null, Error];
  }
};

const getOrders = async () => {
  try {
    const user = await getUser();

    const res = await fetch(`${API.users}/${user.id}/orders`, {
      cache: "no-store",
    });
    const orders: IOrder[] = await res.json();

    console.log({ orders });
    return [orders, null] as [IOrder[], Error];
  } catch (error) {
    console.log({ error });

    return [null, error] as [null, Error];
  }
};

export default {
  getRestaurants,
  getOrders,
};
