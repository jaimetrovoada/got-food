import { getUser } from "./auth.service";
import { IOrder } from "@/types";
import { API } from "./constants";

const getOrders = async () => {
  try {
    const user = await getUser();

    const res = await fetch(`${API.users}/${user.id}/orders`, {
      cache: "no-store",
    });
    const data: IOrder[] = await res.json();

    console.log({ res: data });
    return [data, null] as [IOrder[], Error];
  } catch (error) {
    console.log({ error });

    return [null, error] as [null, Error];
  }
};

export default {
  getOrders,
};
