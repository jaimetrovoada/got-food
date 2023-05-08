import { useState } from "react";
import useToasts from "./useToasts";
import {
  useRestaurant,
  useRestaurantMenu,
  useRestaurantOrders,
  useRestaurants,
} from "./restaurant";
import { useUserDetails, useUserOrders, useUserRestaurants } from "./user";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

function useInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  const handleInputChange = (e: InputChangeEvent) => {
    setValue(e.target.value);
  };

  return [value, handleInputChange] as const;
}

export {
  useInput,
  useToasts,
  useRestaurant,
  useRestaurantMenu,
  useRestaurantOrders,
  useRestaurants,
  useUserDetails,
  useUserOrders,
  useUserRestaurants,
};
