import RestaurantForm from "@/components/Forms/RestaurantForm";
import { getUser } from "@/lib/auth";
import restaurantsService from "@/lib/restaurantsService";

interface Props {
  params: {
    slug: string;
  };
}

async function getRestaurant(slug: string) {
  const { restaurant } = await restaurantsService.getRestaurant(slug);

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
