import { useState } from "react";
export { default as useToasts } from "./useToasts";
export {
  useRestaurant,
  useRestaurantMenu,
  useRestaurantOrders,
} from "./restaurant";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

function useInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  const handleInputChange = (e: InputChangeEvent) => {
    setValue(e.target.value);
  };

  return [value, handleInputChange, setValue] as const;
}

function useFileInput() {
  const [value, setValue] = useState<File | undefined>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    /* TODO: check image resolution
    const img = new Image();
    img.src = URL.createObjectURL(file);
     */

    if (file) {
      setValue(file);
    }
  };
  return [value, handleChange, setValue] as const;
}

export { useInput, useFileInput };
