import Container from "@/components/Container";
import { List, Slider, Item, Slide } from "@/components/Restaurants";

const Loading = async () => {
  return (
    <Container className="flex flex-col gap-8">
      <div>
        <p className="mb-4 text-3xl font-bold capitalize">
          what&apos;s trending
        </p>
        <Slider>
          <Slide.Skeleton />
          <Slide.Skeleton />
          <Slide.Skeleton />
          <Slide.Skeleton />
          <Slide.Skeleton />
        </Slider>
      </div>
      <div>
        <p className="mb-4 text-3xl font-bold">All</p>
        <List>
          <Item.Skeleton />
          <Item.Skeleton />
          <Item.Skeleton />
          <Item.Skeleton />
          <Item.Skeleton />
        </List>
      </div>
    </Container>
  );
};

export default Loading;
