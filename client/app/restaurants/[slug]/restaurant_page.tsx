"use client";

import Cart from "@/components/Cart";
import Container from "@/components/Container";
import Menu from "@/components/Menu";
import { useToasts } from "@/lib/hooks";
import {
  addItemToCart,
  clearCartItems,
  removeItemFromCart,
} from "@/lib/reducers/cartSlice";
import { RootState } from "@/lib/reducers/store";
import restaurantsService from "@/lib/restaurantsService";
import { IMenuItem, IRestaurant, IUser } from "@/types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    const [_, err] = await restaurantsService.placeOrder(
      restaurant.id,
      user.token,
      cart.items.map((item) => {
        return { item: item.id, amount: item.amount };
      }),
      cart.totalPrice,
      tableNumber
    );
    if (err) {
      console.log({ err });
      setErrorMsg("Something went wrong, please try again");
    } else {
      dispatch(clearCartItems(restaurant?.id as string));
      setSuccessMsg("Order Successful");
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
