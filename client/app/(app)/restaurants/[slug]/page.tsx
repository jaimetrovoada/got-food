import restaurantsService from "@/lib/restaurants.service";
import Restaurant from "./restaurant_page";
import { Metadata } from "next";
import { getUser } from "@/lib/auth.service";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const [user, _] = await getUser();
  const { restaurant, menu } = await getRestaurant(params);
  return <Restaurant restaurant={restaurant} menu={menu} user={user} />;
};

export default Page;

async function getRestaurant(params: { slug: string }) {
  const [menu, err] = await restaurantsService.getMenu(params.slug);
  const [restaurant, err2] = await restaurantsService.getRestaurant(
    params.slug
  );

  if (err || err2) {
    return null;
  }

  return { menu, restaurant };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [restaurant, err2] = await restaurantsService.getRestaurant(
    params.slug
  );

  return {
    title: restaurant.name + " | " + "Got Food",
    description: restaurant.description,
  };
}
