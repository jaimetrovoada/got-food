import ItemCard from "@/components/Card";
import restaurantsService, { MenuItem } from "@/services/restaurantsService";
import React, { useState } from "react";
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
import Container from "@/components/Container";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Restaurant = ({ menu, restaurant }: Props) => {
  const cart = useSelector(
    (state: RootState) => state.cart[restaurant?.id as string]
  );
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [cartExpanded, setCartExpanded] = useState<boolean>(false);

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

  const categoryNames = Object.keys(categories);
  const [category, setCategory] = React.useState<string>(categoryNames[0]);

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

  if (!menu) {
    return <div>No menu</div>;
  }

  return (
    <Container className="relative overflow-hidden">
      <section className="flex flex-1 overflow-hidden">
        <aside className="mb-4 flex flex-col overflow-y-auto px-2">
          {Object.keys(categories).map((cat) => (
            <button
              className={`rounded-lg p-2 ${
                category === cat
                  ? "underlines bg-gray-100 font-bold hover:bg-gray-200"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => setCategory(cat)}
              key={cat}
            >
              {cat}
            </button>
          ))}
        </aside>
        <aside className="w-full flex-1 overflow-y-auto px-4">
          {menu
            .filter((item) =>
              category === undefined ? item : item.category === category
            )
            .map((item) => (
              <ItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                imageUrl={item.image}
                price={item.price}
                addToCart={addToCart}
                id={item.id}
              />
            ))}
        </aside>
      </section>
      <section
        className={`flex w-full flex-col bg-white transition-all ${
          cartExpanded ? "absolute bottom-0 h-5/6" : "h-20"
        }`}
      >
        <Button
          onClick={() => setCartExpanded((prev) => !prev)}
          className={`mx-auto -mt-5 flex items-center justify-center rounded-full leading-none transition-all ${
            cartExpanded ? "rotate-180" : ""
          }`}
        >
          ↑
        </Button>
        <h1>Total = ${cart?.totalPrice || 0}</h1>
        {cartExpanded &&
          (cart?.items.length ? (
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
          ))}
      </section>
    </Container>
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
