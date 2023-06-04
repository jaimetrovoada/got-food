"use client";

import Container from "@/components/Container";
import OrdersTableWrapper from "@/components/OrdersTable";
import { useRestaurantOrders } from "@/lib/hooks";

interface Props {
  params: {
    slug: string;
  };
}

const Page = ({ params }: Props) => {
  const slug = params.slug;
  const orders = useRestaurantOrders(slug);

  return (
    <Container className="flex-1">
      <h3 className="text-2xl text-gray-900">Active Orders</h3>
      <OrdersTableWrapper orders={orders} restaurantId={slug} />
    </Container>
  );
};

export default Page;
