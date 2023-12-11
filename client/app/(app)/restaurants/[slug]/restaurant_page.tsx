"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { Menu, Cart } from "@/components/Menu";
import { useToast } from "@/components/ui/use-toast";
import { getClasses } from "@/lib/helpers";
import {
  addItemToCart,
  clearCartItems,
  removeItemFromCart,
} from "@/lib/reducers/cartSlice";
import { RootState } from "@/lib/reducers/store";
import restaurantsService from "@/lib/restaurants.service";
import { IMenuItem, IRestaurant, LoginResponse } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  restaurant: IRestaurant;
  menu: IMenuItem[];
  user: LoginResponse;
}

const Restaurant = ({ menu, restaurant, user }: Props) => {
  const cart = useSelector(
    (state: RootState) => state.cart[restaurant?.id as string]
  );
  const dispatch = useDispatch();

  const [cartExpanded, setCartExpanded] = useState<boolean>(false);

  console.log({ cart });

  const categories: string[] = menu?.reduce(
    (acc, curr) => {
      if (!acc.find((cat) => cat === curr.category)) {
        acc.push(curr.category);
      }
      return acc;
    },
    ["all"]
  );

  const [category, setCategory] = React.useState<string>(categories[0]);
  const { toast } = useToast()

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
      {
        orderedItems: cart.items.map((item) => {
          return { item: item.name, amount: item.amount };
        }),
        totalPrice: cart.totalPrice,
        tableNumber,
      }
    );
    if (err) {
      console.log({ err });
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } else {
      dispatch(clearCartItems(restaurant?.id as string));
      toast({
        title: "Success",
        description: "Order placed successfully",
      });
    }
  };

  const buttonsContainerRef = useRef<ElementRef<"div">>(null);

  const scrollRight = () => {
    if (buttonsContainerRef.current) {
      buttonsContainerRef.current.scrollLeft +=
        buttonsContainerRef.current.offsetWidth;
    }
  };

  const scrollLeft = () => {
    if (buttonsContainerRef.current) {
      buttonsContainerRef.current.scrollLeft -=
        buttonsContainerRef.current.offsetWidth;
    }
  };

  if (!menu || !menu.length) {
    return <div>No menu</div>;
  }

  return (
    <Container className="relative overflow-hidden p-4">
      <section className="mb-24 flex flex-col gap-4 overflow-hidden">
        <div className="flex flex-row items-center gap-2">
          <Button
            className="rounded-full bg-gray-700 p-1 text-gray-100 shadow-sm"
            variant="custom"
            onClick={scrollLeft}
          >
            <ChevronLeft size={16} />
          </Button>
          <div
            className="flex w-full max-w-full flex-row gap-2 overflow-auto scroll-smooth px-2"
            ref={buttonsContainerRef}
          >
            {categories.map((cat) => (
              <Button
                className={getClasses(
                  "rounded-lg border p-2 uppercase hover:border-gray-400",
                  {
                    "border-gray-800 bg-gray-800 font-bold text-gray-200":
                      category === cat,
                    "border-gray-300 text-gray-300": category !== cat,
                  }
                )}
                onClick={() => setCategory(cat)}
                key={cat}
                variant="custom"
              >
                {cat}
              </Button>
            ))}
          </div>
          <Button
            className="rounded-full bg-gray-700 p-1 text-gray-100 shadow-sm"
            variant="custom"
            onClick={scrollRight}
          >
            <ChevronRight size={16} />
          </Button>
        </div>

        <Menu
          menu={menu.filter((item) =>
            category === "all" ? item : item.category === category
          )}
          addToCart={addToCart}
        />
      </section>
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
