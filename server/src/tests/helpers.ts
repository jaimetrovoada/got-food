import Restaurant from "../model/restaurant";
import User from "../model/user";

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
    menu: [
      {
        name: "menu1",
        price: 10,
      },
    ],
    owner: "user1",
  },
];

export const initDb = async () => {
  await Restaurant.deleteMany({});
  await User.deleteMany({});

  const usersObj = users.map((user) => new User(user));
  const usersPromiseArr = usersObj.map((user) => user.save());

  const restObj = restaurants.map((rest) => new Restaurant(rest));
  const restPromiseArr = restObj.map((rest) => rest.save());

  await Promise.all(usersPromiseArr);
  await Promise.all(restPromiseArr);
};
