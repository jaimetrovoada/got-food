import restaurantsService from "@/lib/restaurantsService";
import React from "react";
import Restaurant from "./restaurant_page";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const { restaurant, menu } = await getRestaurant(params);
  return <Restaurant restaurant={restaurant} menu={menu} />;
};

export default Page;

export async function generateStaticParams() {
  const { restaurants } = await restaurantsService.getRestaurants();

  const paths = restaurants.map((restaurant) => {
    return { slug: restaurant.id };
  });

  return paths;
}

async function getRestaurant(params: { slug: string }) {
  const { menu } = await restaurantsService.getMenu(params.slug);
  const { restaurant } = await restaurantsService.getRestaurant(params.slug);

  return { menu, restaurant };
}

export const dynamicParams = true,
  revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const restaurant = await getRestaurant(params);
  return {
    title: restaurant.restaurant.name + " | " + "Got Food",
    description: restaurant.restaurant.description,
  };
}
