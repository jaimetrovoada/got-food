export interface IUserRestaurants {
  id: string;
  name: string;
  logo: string;
  description: string;
}
export interface IUserDetails {
  id: string;
  name: string;
  email: string;
  restaurants: IUserRestaurants[];
  role: "customer" | "business";
}

export interface IOrder {
  restaurant: IUserRestaurants;
  orderedItems: IOrderedItem[];
  totalPrice: number;
  date: Date;
  id: string;
  status: string;
  tableNumber: string;
  orderId: string;
}

export interface IOrderedItem {
  item: IItem;
  amount: number;
  _id: string;
}

export interface IItem {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  restaurant: string;
  id: string;
}

export interface IRestaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  menuItems: IMenuItem[];
  owner: {
    name: string;
    email: string;
  };
  logo: string;
}

export interface IMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}
