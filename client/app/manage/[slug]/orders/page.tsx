"use client";

import OrdersTableWrapper from "@/components/OrdersTable";
import { useRestaurantOrders } from "@/hooks";
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

  const newOrders = [
    ...orders,
    ...orders,
    ...orders,
    ...orders,
    ...orders,
    ...orders,
    ...orders,
    ...orders,
  ];

  return (
    <section className="flex flex-1 flex-col gap-4 overflow-hidden py-4 lg:py-6">
      <OrdersTableWrapper orders={newOrders} restaurantId={slug} />
    </section>
  );
};

export default Page;
