import { LinkCard } from "@/components/Card";
import restaurantsService from "@/services/restaurantsService";
import { InferGetStaticPropsType } from "next";
import React from "react";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Restaurants = ({ restaurants }: Props) => {
  /*  const { restaurants, isLoading, isError } =
    restaurantsService.useRestaurants(); */

  console.log({ restaurants });
  /*   if (isLoading) {
    return <div>loading</div>;
  }
 */
  return (
    <div className="flex flex-col gap-4">
      {restaurants?.map((restaurant) => (
        <LinkCard
          href={`/restaurants/${restaurant.id}`}
          key={restaurant.id}
          name={restaurant.name}
          imageUrl={restaurant.logo}
          description={restaurant.description}
        />
      ))}
    </div>
  );
};

export default Restaurants;

export async function getStaticProps() {
  const { restaurants } = await restaurantsService.getRestaurants();
  return {
    props: { restaurants },
    revalidate: 60,
  };
}
