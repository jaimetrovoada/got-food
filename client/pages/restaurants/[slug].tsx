import ItemCard from "@/components/Card";
import restaurantsService, { MenuItem } from "@/services/restaurantsService";
import React from "react";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reducers/store";
import {
  addItemToCart,
  clearCartItems,
  removeItemFromCart,
} from "@/reducers/cartSlice";
import Button from "@/components/Button";
import { useToasts } from "@/hooks";
import { InferGetStaticPropsType } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Restaurant = ({ menu, restaurant }: Props) => {

  const cart = useSelector(
    (state: RootState) => state.cart[restaurant?.id as string]
  );
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { setSuccessMsg, setErrorMsg } = useToasts();

  console.log({ cart });

  // group by category
  const categories: Record<string, MenuItem[]> | undefined = menu?.reduce(
    (acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = [];
      }
      acc[curr.category].push(curr);
      return acc;
    },
    {} as Record<string, MenuItem[]>
  );

  const [category, setCategory] = React.useState<string | undefined>(undefined);

  const addToCart = (price: number, name: string, id: string) => {
    dispatch(
      addItemToCart({
        restaurantId: restaurant?.id as string,
        item: {
          id,
          name,
          price,
          amount: 1,
        },
      })
    );
  };

  const removeFromCart = (itemName: string) => {
    dispatch(
      removeItemFromCart({ restaurantId: restaurant?.id as string, itemName })
    );
  };

  const clearCart = () => {
    dispatch(clearCartItems(restaurant?.id as string));
  };

  const handleCheckout = async () => {
    try {
      const res = await restaurantsService.placeOrder(
        restaurant.id,
        user.token,
        cart.items.map((item) => {
          return { itemId: item.id, amount: item.amount };
        }),
        cart.totalPrice
      );
      if (res.status === 201) {
        setSuccessMsg("Order Successful");
        dispatch(clearCartItems(restaurant?.id as string));
      }
    } catch (err) {
      console.log({ err });
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return setErrorMsg(err.response?.data?.error);
        }
      }
      setErrorMsg("Something went wrong, please try again");
    }
  };

  return (
    <div>
      <div className="mb-4">
        {categories &&
          Object.keys(categories).map((cat) => (
            <>
              <button
                className={`rounded-xl border p-1 shadow-sm ${
                  category === cat && "bg-blue-500"
                }`}
                onClick={() =>
                  setCategory((prev) => (prev === cat ? undefined : cat))
                }
              >
                {cat}
              </button>
            </>
          ))}
      </div>
      {menu && menu.length ? (
        menu
          ?.filter((item) =>
            category === undefined ? item : item.category === category
          )
          ?.map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              description={item.description}
              imageUrl={item.image}
              price={item.price}
              addToCart={addToCart}
              id={item.id}
            />
          ))
      ) : (
        <div>No menu</div>
      )}
      <section className="mt-4">
        <h1>Cart = ${cart?.totalPrice || 0}</h1>
        {cart?.items.length ? (
          <>
            {cart.items.map((item) => (
              <div key={item.name}>
                {item.name} - {item.amount}x
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    removeFromCart(item.name);
                  }}
                  type="reset"
                >
                  -
                </Button>
              </div>
            ))}
            <div>
              <Button onClick={() => clearCart()}>Clear</Button>
              <Button onClick={handleCheckout}>Checkout</Button>
            </div>
          </>
        ) : (
          <div>No items in cart</div>
        )}
      </section>
    </div>
  );
};

export default Restaurant;

export async function getStaticPaths() {
  const { restaurants } = await restaurantsService.getRestaurants();

  const paths = restaurants.map((restaurant) => ({
    params: { slug: restaurant.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { menu } = await restaurantsService.getMenu(slug);
  const { restaurant } = await restaurantsService.getRestaurant(slug);

  return {
    props: { menu, restaurant },
    revalidate: 60,
  };
}
