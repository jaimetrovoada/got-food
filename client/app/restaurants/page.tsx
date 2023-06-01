import Container from "@/components/Container";
import RestaurantList from "@/components/RestaurantList";
import TrendingSlider from "@/components/TrendingSlider";
import restaurantsService from "@/lib/restaurantsService";
import React from "react";

const Page = async () => {
  const restaurants = await getRestaurants();
  const trendingRestaurants = await getGetTrending();
  return (
    <Container className="flex flex-col gap-8 p-2">
      <div>
        <p className="mb-4 text-3xl font-bold capitalize">
          what&apos;s trending
        </p>
        <TrendingSlider trending={trendingRestaurants} />
      </div>
      <div>
        <p className="mb-4 text-3xl font-bold">All</p>
        <section className="grid grid-flow-row grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <RestaurantList restaurants={restaurants} />
        </section>
      </div>
    </Container>
  );
};

export default Page;

async function getRestaurants() {
  const [res, err] = await restaurantsService.getRestaurants();

  if (err) {
    return null;
  }

  return res;
}
async function getGetTrending() {
  const [restaurant, err] = await restaurantsService.getTrendingRestaurants();

  if (err) {
    throw err;
  }
  return restaurant;
}
