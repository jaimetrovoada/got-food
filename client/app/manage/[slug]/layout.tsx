import ManageLayout from "@/components/ManageLayout";
import restaurantsService from "@/lib/restaurantsService";

interface Props {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

async function getRestaurant(slug: string) {
  const { restaurant } = await restaurantsService.getRestaurant(slug);

  return restaurant;
}


export default async function Layout({ children, params }: Props) {
  const restaurant = await getRestaurant(params.slug);

  return <ManageLayout params={params} name={restaurant.name}>{children}</ManageLayout>;
}
