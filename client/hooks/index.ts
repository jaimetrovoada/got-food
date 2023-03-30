import { ToastsContext } from "@/contexts/ToastsProvider";
import { useCallback, useState, useContext, useEffect } from "react";

export const useToasts = () => {
  const context = useContext(ToastsContext);

  const message = context.toast.message;
  const type = context.toast.type;

  const setSuccessMsg = useCallback((message: string) => {
    context.setMessage({ message, type: "success" });
    setTimeout(() => {
      context.setMessage({ message: "", type: "info" });
    }, 5000);
  }, []);
  const setErrorMsg = useCallback((message: string) => {
    context.setMessage({ message, type: "error" });
    setTimeout(() => {
      context.setMessage({ message: "", type: "info" });
    }, 5000);
  }, []);
  const setInfoMsg = useCallback((message: string) => {
    context.setMessage({ message, type: "info" });
    setTimeout(() => {
      context.setMessage({ message: "", type: "info" });
    }, 5000);
  }, []);

  return { message, type, setSuccessMsg, setErrorMsg, setInfoMsg };
};

export const useLocalStorage = <T>(key: string, fallbackValue: T) => {
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}