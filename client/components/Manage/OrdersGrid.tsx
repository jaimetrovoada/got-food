import React from "react";

interface Props {
  children: React.ReactNode;
}

const OrdersGrid = ({ children }: Props) => {
  return (
    <aside className="grid h-fit flex-1 grid-cols-1 gap-4 overflow-y-auto scrollbar-none md:grid-cols-2 lg:grid-cols-3">
      {children}
    </aside>
  );
};

export default OrdersGrid;
