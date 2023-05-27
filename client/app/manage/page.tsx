import UserRestaurantPage from "./client_page";
import config from "@/utils/config";
import { IUserRestaurants } from "@/types";
import axios from "axios";
import { getUser } from "@/lib/auth";

const getUserRestaurants = async (userId: string) => {
  const res = await axios.get<IUserRestaurants[]>(
    `${config.BACKEND_URL}/api/users/${userId}/restaurants`
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
