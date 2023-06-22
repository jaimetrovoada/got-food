"use client";
import {
  OrderDetails as Details,
  OrdersGrid as Grid,
  OrderItem as Item,
} from "@/components/Manage";
import Modal, { ModalHandler } from "@/components/Modal";
import { useRestaurantOrders } from "@/lib/hooks";
import { IOrder } from "@/types";
import { useRef, useState } from "react";

interface Props {
  params: {
    slug: string;
  };
}

const Page = ({ params }: Props) => {
  const slug = params.slug;
  const orders = useRestaurantOrders(slug);
  const [activeOrder, setActiveOrder] = useState<IOrder>();
  const modalRef = useRef<ModalHandler>(null);

  const showDetails = (order: IOrder) => {
    setActiveOrder(order);
    modalRef.current.show();
  };

  return (
    <>
      <Grid>
        {orders
          ?.filter((order) => order.status === "pending")
          ?.sort((a, b) => Number(a.orderId) - Number(b.orderId))
          ?.map((order) => (
            <Item key={order.orderId} order={order} showDetails={showDetails} />
          ))}
      </Grid>
      <Modal ref={modalRef}>
        <Details order={activeOrder} restaurantId={slug} />
      </Modal>
    </>
  );
};

export default Page;
