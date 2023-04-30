import { LinkCard } from "@/components/Card";
import Container from "@/components/Container";
import restaurantsService from "@/services/restaurantsService";
import { InferGetStaticPropsType } from "next";
import React from "react";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Restaurants = ({ restaurants }: Props) => {
  return (
    <Container className="flex flex-col gap-4 p-2">
      {restaurants?.map((restaurant) => (
        <LinkCard
          href={`/restaurants/${restaurant.id}`}
          key={restaurant.id}
          name={restaurant.name}
          imageUrl={restaurant.logo}
          description={restaurant.description}
        />
      ))}
    </Container>
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
