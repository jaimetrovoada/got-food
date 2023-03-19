import Menu from "../model/menu";
import models from "../model";
import mongoose from "mongoose";

export const users = [
  {
    name: "user1",
    email: "1@1.com",
    password: "123456",
    role: "customer",
  },
  {
    name: "user2",
    email: "2@2.com",
    password: "123456",
    role: "customer",
  },
  {
    name: "user3",
    email: "3@3.com",
    password: "123456",
    role: "business",
  },
  {
    name: "user4",
    email: "4@4.com",
    password: "123456",
    role: "business",
  },
];

export const restaurants = [
  {
    name: "restaurant1",
    description: "description1",
    address: "address1",
  },
];

export const menuItems = [
  {
    name: "menuItem1",
    description: "description1",
    price: 10,
    category: "drinks",
    image: "image1",
  },
  {
    name: "menuItem2",
    description: "description1",
    price: 10,
    category: "dessert",
    image: "image1",
  },
  {
    name: "menuItem3",
    description: "description1",
    price: 10,
    category: "drinks",
    image: "image1",
  },
];
export const initDb = async () => {
  await models.Restaurant.deleteMany({});
  await models.User.deleteMany({});

  const usersObj = users.map((user) => new models.User(user));
  const usersPromiseArr = usersObj.map((user) => user.save());
  await Promise.all(usersPromiseArr);
  const _users = await models.User.find({});

  const restObj = restaurants.map(
    (rest) => new models.Restaurant({ ...rest, owner: _users[0]._id })
  );
  const restPromiseArr = restObj.map((rest) => {
    rest.save();
  });
  await Promise.all(restPromiseArr);
  const _restaurants = await models.Restaurant.find({});

  const menuItemsObj = menuItems.map(
    (menuItem) => new Menu({ ...menuItem, restaurant: _restaurants[0]._id })
  );
  const menuItemsPromiseArr = menuItemsObj.map((menuItem) => {
    menuItem.save();
  });

  await Promise.all(menuItemsPromiseArr);
};
