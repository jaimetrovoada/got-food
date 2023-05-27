import restaurantsService from "@/lib/restaurantsService";
import Restaurant from "./restaurant_page";
import { Metadata } from "next";
import { getUser } from "@/lib/auth";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const user = await getUser();
  const { restaurant, menu } = await getRestaurant(params);
  return <Restaurant restaurant={restaurant} menu={menu} user={user} />;
};

export default Page;

async function getRestaurant(params: { slug: string }) {
  const { menu } = await restaurantsService.getMenu(params.slug);
  const { restaurant } = await restaurantsService.getRestaurant(params.slug);

  return { menu, restaurant };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const restaurant = await getRestaurant(params);
  return {
    title: restaurant.restaurant.name + " | " + "Got Food",
    description: restaurant.restaurant.description,
  };
}
