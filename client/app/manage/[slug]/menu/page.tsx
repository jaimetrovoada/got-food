import { IMenuItem } from "@/types";
import { getUser } from "@/lib/auth";
import axios from "axios";
import config from "@/utils/config";
import MenuPage from "./client-page";

interface Props {
  params: {
    slug: string;
  };
}

async function getMenu(slug) {
  const res = await axios.get<IMenuItem[]>(
    `${config.BACKEND_URL}/api/restaurants/${slug}/menu`
  );

  return res.data;
}

const Page = async ({ params }: Props) => {
  const user = await getUser();

  const slug = params?.slug as string;

  const menu = await getMenu(slug);

  return (
    <section className="mx-auto w-full max-w-screen-md overflow-hidden pb-10">
      <MenuPage menu={menu} user={user} slug={slug} />
    </section>
  );
};

export default Page;
