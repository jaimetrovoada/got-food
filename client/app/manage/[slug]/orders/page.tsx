"use client";

import Container from "@/components/Container";
import {
  OrderDetails as Details,
  OrdersGrid as Grid,
  OrderItem as Item,
} from "@/components/Manage";
import { useRestaurantOrders } from "@/lib/hooks";
import { IOrder } from "@/types";
import { useState } from "react";

interface Props {
  params: {
    slug: string;
  };
}

const Page = ({ params }: Props) => {
  const slug = params.slug;
  const orders = useRestaurantOrders(slug);
  const [activeOrder, setActiveOrder] = useState<IOrder>();

  return (
    <Container className="flex-1">
      <h3 className="text-2xl text-gray-900">Active Orders</h3>

      <div className="flex h-full flex-1 gap-2 overflow-y-hidden pb-4 lg:gap-8">
        <Grid>
          {orders
            ?.filter((order) => order.status === "pending")
            ?.sort((a, b) => Number(a.orderId) - Number(b.orderId))
            ?.map((order) => (
              <Item
                key={order.orderId}
                order={order}
                setActiveOrder={setActiveOrder}
              />
            ))}
        </Grid>
        <Details order={activeOrder} restaurantId={slug} />
      </div>
    </Container>
  );
};

export default Page;
