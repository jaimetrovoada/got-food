import { getUser } from "@/lib/auth.service";
import restaurantsService from "@/lib/restaurants.service";
import MenuPage from "./client-page";

interface Props {
  params: {
    slug: string;
  };
}

async function getMenu(slug: string) {
  const [menu, err] = await restaurantsService.getMenu(slug);

  if (err) {
    return null;
  }
  return menu;
}

const Page = async ({ params }: Props) => {
  const [user, _] = await getUser();

  const slug = params?.slug as string;

  const menu = await getMenu(slug);

  return (
    <section className="mx-auto w-full max-w-screen-md overflow-hidden pb-10">
      <MenuPage menu={menu} user={user} slug={slug} />
    </section>
  );
};

export default Page;
