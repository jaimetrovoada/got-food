import { ToastsContext } from "@/lib/contexts/ToastsProvider";
import { useCallback, useContext } from "react";

const useToasts = () => {
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

export default useToasts;
