import { getUser } from "./auth.service";
import { IOrder, IRestaurant } from "@/types";
import { API } from "./constants";

const getRestaurants = async (userId: string) => {
  try {
    if (!userId) return [null, null] as [null, null];

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

const deleteUser = async (token: string, userId: string) => {
  try {
    const res = await fetch(`${API.users}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // const body = await res.json();
    const data = {
      ok: res.ok,
      status: res.status,
    };
    console.log({ data, res });

    return [data, null] as [typeof data, null];
  } catch (error) {
    console.log({ error });
    return [null, error] as [null, Error];
  }
};

export default {
  getRestaurants,
  getOrders,
  deleteUser,
};
