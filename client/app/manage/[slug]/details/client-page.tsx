import RestaurantForm from "@/components/Forms/RestaurantForm";
import { IRestaurant, IUser } from "@/types";

interface Props {
  restaurant: IRestaurant;
  user: IUser;
}

const RestaurantDetailsForm = ({ restaurant, user }: Props) => {
  return (
    <>
      <RestaurantForm user={user} initialValues={restaurant} />
    </>
  );
};

export default RestaurantDetailsForm;
