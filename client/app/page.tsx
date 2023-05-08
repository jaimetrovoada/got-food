import restaurantsService from "@/services/restaurantsService";
import Home from "./home_page";

const Page = async () => {
  const trending = await getTrending();
  return <Home trending={trending} />;
};

export default Page;

export const revalidate = 3600;

async function getTrending() {
  const { restaurants: trending } =
    await restaurantsService.getTrendingRestaurants();

  return trending;
}
