import UserRestaurantPage from "./client_page";
import { getUser } from "@/lib/auth.service";
import userService from "@/lib/user.service";
import Container from "@/components/Container";

const Page = async () => {
  const user = await getUser();
  const [restaurants, _] = await userService.getRestaurants(user?.id);

  return (
    <Container>
      <UserRestaurantPage restaurants={restaurants} user={user} />
    </Container>
  );
};

export default Page;
