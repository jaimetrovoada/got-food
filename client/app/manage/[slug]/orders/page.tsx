"use client";

import Container from "@/components/Container";
import OrdersTableWrapper from "@/components/OrdersTable";
import { useRestaurantOrders } from "@/lib/hooks";
import { useParams } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

const Page = ({}: Props) => {
  const params = useParams();
  const slug = params.slug;
  const orders = useRestaurantOrders(slug);

  return (
    <Container className="flex-1">
      <OrdersTableWrapper orders={orders} restaurantId={slug} />
    </Container>
  );
};

export default Page;
