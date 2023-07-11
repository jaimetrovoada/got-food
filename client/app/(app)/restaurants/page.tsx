import Container from "@/components/Container";
import { List, Slider, Item, Slide } from "@/components/Restaurants";
import restaurantsService from "@/lib/restaurants.service";

const Page = async () => {
  const [restaurants, err] = await restaurantsService.getRestaurants();
  const [trendingRestaurants, errTrending] =
    await restaurantsService.getTrendingRestaurants();

  return (
    <Container className="flex flex-col gap-8">
      {trendingRestaurants ? (
        <div>
          <p className="mb-4 text-3xl font-bold capitalize">
            what&apos;s trending
          </p>
          <Slider>
            {trendingRestaurants.map((restaurant) => (
              <Slide key={restaurant.id} restaurant={restaurant} />
            ))}
          </Slider>
        </div>
      ) : null}
      {restaurants ? (
        <div>
          <p className="mb-4 text-3xl font-bold">All</p>
          <List>
            {restaurants.map((restaurant) => (
              <Item
                href={`/restaurants/${restaurant.id}`}
                key={restaurant.id}
                name={restaurant.name}
                imageUrl={restaurant.logo}
                description={restaurant.description}
                address={restaurant.address}
              />
            ))}
          </List>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          <p>Nothing yet!!! Comeback some other time</p>
        </div>
      )}
    </Container>
  );
};

export default Page;
