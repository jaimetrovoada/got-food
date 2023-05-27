"use client";

import React, { useState } from "react";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/store";
import {
  addItemToCart,
  clearCartItems,
  removeItemFromCart,
} from "@/lib/reducers/cartSlice";
import { useToasts } from "@/lib/hooks";
import Container from "@/components/Container";
import Menu from "@/components/Menu";
import Cart from "@/components/Cart";
import restaurantsService from "@/lib/restaurantsService";
import { IMenuItem, IRestaurant, IUser } from "@/types";

interface Props {
  restaurant: IRestaurant;
  menu: IMenuItem[];
  user: IUser;
}

const Restaurant = ({ menu, restaurant, user }: Props) => {
  const cart = useSelector(
    (state: RootState) => state.cart[restaurant?.id as string]
  );
  const dispatch = useDispatch();

  const [cartExpanded, setCartExpanded] = useState<boolean>(false);

  const { setSuccessMsg, setErrorMsg } = useToasts();

  console.log({ cart });

  // group by category
  const categories: Record<string, IMenuItem[]> | undefined = menu?.reduce(
    (acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = [];
      }
      acc[curr.category].push(curr);
      return acc;
    },
    {} as Record<string, IMenuItem[]>
  );

  const [category, setCategory] = React.useState<string>("all");

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

  const handleCheckout = async (tableNumber: number) => {
    try {
      const res = await restaurantsService.placeOrder(
        restaurant.id,
        user.token,
        cart.items.map((item) => {
          return { item: item.id, amount: item.amount };
        }),
        cart.totalPrice,
        tableNumber
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

  if (!menu || !menu.length) {
    return <div>No menu</div>;
  }

  return (
    <Container className="relative overflow-hidden">
      <Menu
        menu={menu}
        categories={categories}
        category={category}
        setCategory={setCategory}
        addToCart={addToCart}
      />
      <Cart
        cart={cart}
        cartExpanded={cartExpanded}
        setCartExpanded={setCartExpanded}
        handleCheckout={handleCheckout}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </Container>
  );
};

export default Restaurant;
