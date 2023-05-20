import { useToasts } from "@/hooks";
import React from "react";

const Toasts = () => {
  const { message, type } = useToasts();
  if (!message) return null;

  return (
    <div
      className={`absolute right-4 top-4 rounded-2xl p-4
      ${type === "success" && "bg-green-500"} 
      ${type === "info" && "bg-yellow-500"} 
      ${type === "error" && "bg-red-500"} 
      animate-bounce text-xl`}
    >
      {message}
    </div>
  );
};

export default Toasts;
