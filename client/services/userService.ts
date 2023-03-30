import axios from "axios";
import useSWR from "swr";
import config from "@/utils/config";

interface IUserRestaurants {
  id: string;
  name: string;
}

const useUserRestaurants = (id: string) => {
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

export default { useUserRestaurants };
