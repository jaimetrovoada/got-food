import React, { createContext, useState } from "react";

interface Toast {
  type: "success" | "error" | "info";
  message: string;
}

export const ToastsContext = createContext<{
  toast: { message: string; type: "error" | "success" | "info" };
  setMessage: React.Dispatch<React.SetStateAction<Toast>>;
}>({
  toast: { message: "", type: "info" },
  setMessage: () => {},
});

const ToastsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<Toast>({ type: "info", message: "" });

  return (
    <ToastsContext.Provider value={{ toast, setMessage: setToast }}>
      {children}
    </ToastsContext.Provider>
  );
};

export default ToastsProvider;
