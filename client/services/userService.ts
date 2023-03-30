import axios from "axios";
import useSWR from "swr";

interface IUserRestaurants {
  id: string;
  name: string;
}

const useUserRestaurants = (id: string) => {
  const fetcher = (url: string) =>
    axios.get<IUserRestaurants[]>(url).then((res) => res.data);

  const { data, isLoading, error } = useSWR(
    `http://localhost:3001/users/${id}/restaurants`,
    fetcher
  );

  return {
    restaurants: data,
    isLoading,
    error,
  };
};

export default { useUserRestaurants };
