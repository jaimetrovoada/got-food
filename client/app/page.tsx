import restaurantsService from "@/lib/restaurantsService";
import Button from "@/components/Button";
import Container from "@/components/Container";
import TrendingSlider from "@/components/TrendingSlider";
import Link from "next/link";

const Page = async () => {
  const trending = await getTrending();

  if (!trending || trending.length === 0) {
    return (
      <Container className="flex items-center justify-center">
        <Button as={Link} href="/restaurants">
          Explore
        </Button>
      </Container>
    );
  }

  return (
    <Container className="flex max-w-full">
      <TrendingSlider trending={trending} />
    </Container>
  );
};

export default Page;

export const revalidate = 3600;

async function getTrending() {
  const { restaurants: trending } =
    await restaurantsService.getTrendingRestaurants();

  return trending;
}
