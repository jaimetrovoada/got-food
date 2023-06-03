import Container from "@/components/Container";
import RestaurantList from "@/components/RestaurantList";
import TrendingSlider from "@/components/TrendingSlider";
import restaurantsService from "@/lib/restaurantsService";
import React from "react";

const Page = async () => {
  const restaurantsData = getRestaurants();
  const trendingRestaurantsData = getGetTrending();
  const [restaurants, trendingRestaurants] = await Promise.all([
    restaurantsData,
    trendingRestaurantsData,
  ]);
  return (
    <Container className="flex flex-col gap-8 pt-4">
      {trendingRestaurants ? (
        <div>
          <p className="mb-4 text-3xl font-bold capitalize">
            what&apos;s trending
          </p>
          <TrendingSlider trending={trendingRestaurants} />
        </div>
      ) : null}
      {restaurants ? (
        <div>
          <p className="mb-4 text-3xl font-bold">All</p>
          <RestaurantList restaurants={restaurants} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          <p>Nothing yet!!! Comeback some other time</p>
        </div>
      )}
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
    return null;
  }

  return restaurant;
}
