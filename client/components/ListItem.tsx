import { getClasses } from "@/lib/helpers";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListItem = ({ children, className }: Props) => {
  return (
    <div
      className={getClasses(
        "group flex flex-row items-center gap-4 border-b border-b-gray-800 px-4 py-2 hover:bg-zinc-900/30",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ListItem;
