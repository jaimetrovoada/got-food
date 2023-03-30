import restaurantsService from "@/services/restaurantsService";
import Link from "next/link";
import React from "react";

const Restaurants = () => {
  const { restaurants, isLoading, isError } =
    restaurantsService.useRestaurants();

  console.log({ restaurants });
  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {restaurants?.map((restaurant) => (
        <Link
          href={`/restaurants/${restaurant.id}`}
          key={restaurant.id}
          className="flex flex-row rounded-2xl border"
        >
          <img
            src={restaurant.logo}
            alt={restaurant.name + " " + "logo"}
            width={50}
            height={50}
            className="rounded-tl-2xl rounded-bl-2xl"
          />
          <div className="p-2">
            <h3 className="text-2xl font-bold">{restaurant.name}</h3>
            <p className="text-gray-500">{restaurant.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Restaurants;
