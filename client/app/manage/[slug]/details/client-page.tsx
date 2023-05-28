"use client";
import Button from "@/components/Button";
import Form from "@/components/Forms/Form";
import { useInput, useToasts } from "@/lib/hooks";
import restaurantsService from "@/lib/restaurantsService";
import { IRestaurant, IUser } from "@/types";
import { useRouter } from "next/navigation";
import { Trash } from "react-feather";

interface Props {
  restaurant: IRestaurant;
  user: IUser;
}

const RestaurantDetailsForm = ({ restaurant, user }: Props) => {
  const [nameValue, handleNameChange] = useInput(restaurant?.name);
  const [descriptionValue, handleDescriptionChange] = useInput(
    restaurant?.description
  );
  const [addressValue, handleAddressChange] = useInput(restaurant?.address);

  const router = useRouter();
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const handleDeleteRestaurant = async () => {
    try {
      const res = await restaurantsService.deleteRestaurant(
        user.token,
        restaurant?.id
      );

      if (res.status === 200) {
        setSuccessMsg("Restaurant deleted successfully");
        router.replace(`/users/${user.id}/restaurants`);
      }
      console.log({ res });
    } catch (error) {
      console.log({ delError: error });
      setErrorMsg("Something went wrong");
    }
  };

  return (
    <>
      <Form onSubmit={null}>
        <Form.Input
          name="name"
          id="name"
          type="text"
          onChange={handleNameChange}
          labelText="Name"
          value={nameValue}
          disabled
        />
        <Form.Input
          name="description"
          id="description"
          type="text"
          onChange={handleDescriptionChange}
          labelText="Description"
          value={descriptionValue}
          disabled
        />
        <Form.Input
          name="address"
          id="address"
          type="text"
          onChange={handleAddressChange}
          labelText="Address"
          value={addressValue}
          disabled
        />
        <Button onClick={handleDeleteRestaurant} className="bg-red-500">
          <Trash />
        </Button>
      </Form>
    </>
  );
};

export default RestaurantDetailsForm;
