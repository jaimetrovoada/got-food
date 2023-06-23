import RestaurantForm from "@/components/Forms/RestaurantForm";
import { getUser } from "@/lib/auth.service";
import restaurantsService from "@/lib/restaurants.service";

interface Props {
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

const Page = async ({ params }: Props) => {
  const slug = params?.slug as string;
  const user = await getUser();

  const restaurant = await getRestaurant(slug);

  return (
    <section className="mx-auto w-full max-w-screen-md">
      <RestaurantForm user={user} initialValues={restaurant} />
    </section>
  );
};

export default Page;
