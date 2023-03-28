import Menu from "../model/menu";
import models from "../model";
import supertest from "supertest";

const users = [
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
  {
    name: "admin",
    email: "admin@rest.com",
    password: "123456",
    role: "admin",
  },
];

const restaurants = [
  {
    name: "restaurant1",
    description: "description1",
    address: "address1",
    image: "path/to/image",
  },
];

const menuItems = [
  {
    name: "menuItem1",
    description: "description1",
    price: 10,
    category: "drinks",
    image: "path/to/image",
  },
  {
    name: "menuItem2",
    description: "description1",
    price: 10,
    category: "dessert",
    image: "path/to/image",
  },
  {
    name: "menuItem3",
    description: "description1",
    price: 10,
    category: "drinks",
    image: "path/to/image",
  },
];

const emptyDb = async () => {
  await models.User.deleteMany({});
  await models.Restaurant.deleteMany({});
  await models.Menu.deleteMany({});
};

const initDb = async () => {
  await emptyDb();

  const usersObj = users.map((user) => new models.User(user));
  const usersPromiseArr = usersObj.map((user) => user.save());
  await Promise.all(usersPromiseArr);
  const _users = await models.User.find({});

  const restObj = restaurants.map(
    (rest) => new models.Restaurant({ ...rest, owner: _users[0]._id })
  );
  const restPromiseArr = restObj.map((rest) => rest.save());
  await Promise.all(restPromiseArr);
  const _restaurants = await models.Restaurant.find({});

  const menuItemsObj = menuItems.map(
    (menuItem) => new Menu({ ...menuItem, restaurant: _restaurants[0]._id })
  );
  const menuItemsPromiseArr = menuItemsObj.map((menuItem) => menuItem.save());

  await Promise.all(menuItemsPromiseArr);

  const _menuItems = await models.Menu.find({});

  const menuItemsId = _menuItems.map((menuItem) => menuItem._id);
  _restaurants[0].menuItems = _restaurants[0].menuItems.concat(menuItemsId);

  await _restaurants[0].save();
};

const userCreation = async (
  api: supertest.SuperTest<supertest.Test>,
  user: {
    name: string;
    email: string;
    password: string;
    role: string;
  }
) => {
  return await api.post("/users/register").send(user);
};

const userLogin = async (
  api: supertest.SuperTest<supertest.Test>,
  user: {
    email: string;
    password: string;
  }
) => {
  return await api.post("/users/login").send(user);
};

export default {
  initDb,
  emptyDb,
  userCreation,
  userLogin,
};
