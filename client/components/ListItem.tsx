import React from "react";

interface Props {
  children: React.ReactNode;
}

const ListItem = ({ children }: Props) => {
  return (
    <div className="group flex flex-row items-center gap-4 border-b border-gray-200 py-2 px-4 hover:bg-gray-50">
      {children}
    </div>
  );
};

export default ListItem;
