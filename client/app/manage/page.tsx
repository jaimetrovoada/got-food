import UserRestaurantPage from "./client_page";
import { IUserRestaurants } from "@/types";
import axios from "axios";
import { getUser } from "@/lib/auth";
import { API } from "@/lib/constants";

const getUserRestaurants = async (userId: string) => {
  const res = await axios.get<IUserRestaurants[]>(
    `${API.users}/${userId}/restaurants`
  );
  const restaurants = res.data;
  return restaurants;
};
const Page = async () => {
  const user = await getUser();
  const restaurants = await getUserRestaurants(user.id);

  return <UserRestaurantPage restaurants={restaurants} user={user} />;
};

export default Page;
