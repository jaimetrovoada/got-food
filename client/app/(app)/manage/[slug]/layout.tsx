import ManageLayout from "@/components/ManageLayout";
import restaurantsService from "@/lib/restaurants.service";

interface Props {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

async function getRestaurant(slug: string) {
  const [restaurant, err] = await restaurantsService.getRestaurant(slug);

  if (err) {
    return null;
  }

  return restaurant;
}

export default async function Layout({ children, params }: Props) {
  const restaurant = await getRestaurant(params.slug);

  return (
    <ManageLayout params={params} name={restaurant.name}>
      {children}
    </ManageLayout>
  );
}
