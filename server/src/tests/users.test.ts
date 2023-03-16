import supertest from "supertest";
import app from "../app";
import User from "../model/user";

const TIMEOUT = 100_000;

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
];

const api = supertest(app);
describe("users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const usersObj = users.map((user) => new User(user));

    const usersPromiseArr = usersObj.map((user) => user.save());

    await Promise.all(usersPromiseArr);
  }, TIMEOUT);
  test("can add users", async () => {
    const res = await api.get("/users");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(users.length);
    console.log({ body: res.body });

    res.body?.forEach((user: any) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("role");
      expect(user).not.toHaveProperty("password");
    });
  });
});
