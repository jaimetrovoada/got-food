import React, { useCallback, useState, createContext, useContext } from "react";

interface Toast {
  type: "success" | "error" | "info";
  message: string;
}

const ToastsContext = createContext<{
  toast: { message: string; type: "error" | "success" | "info" };
  setMessage: React.Dispatch<React.SetStateAction<Toast>>;
}>({
  toast: { message: "", type: "info" },
  setMessage: () => {},
});

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

export const ToastsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<Toast>({ type: "info", message: "" });

  return (
    <ToastsContext.Provider value={{ toast, setMessage: setToast }}>
      {children}
    </ToastsContext.Provider>
  );
};
