import restaurantsService from "@/services/restaurantsService";
import { useRouter } from "next/router";
import React from "react";

const Restaurant = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { menu, isLoading, isError } =
    restaurantsService.useRestaurantMenu(slug);

  if (isError) {
    console.log({ isError });
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {menu && menu.length ? (
        menu?.map((item) => <div key={item.id}>{item.name}</div>)
      ) : (
        <div>No menu</div>
      )}
    </div>
  );
};

export default Restaurant;
