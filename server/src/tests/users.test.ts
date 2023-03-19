import supertest from "supertest";
import app from "../app";
import User from "../model/user";
import { users } from "./helpers";

const TIMEOUT = 100_000;

const api = supertest(app);
describe("users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const usersObj = users.map((user) => new User(user));

    const usersPromiseArr = usersObj.map((user) => user.save());

    await Promise.all(usersPromiseArr);
  }, TIMEOUT);
  test("can get users", async () => {
    const res = await api.get("/users");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(users.length);

    res.body?.forEach((user: any) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("role");
      expect(user).not.toHaveProperty("password");
    });
  });

  test("can add users", async () => {
    const user = {
      name: "test",
      email: "test",
      password: "test",
      role: "customer",
    };
    await api
      .post("/users")
      .send(user)
      .expect("Content-Type", /application\/json/)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe(user.name);
        expect(res.body.email).toBe(user.email);
        expect(res.body.role).toBe(user.role);
        expect(res.body).not.toHaveProperty("password");
        expect(res.body).not.toHaveProperty("restaurants");
      });
  });

  test("add business user", async () => {
    const user = {
      name: "test",
      email: "test",
      password: "test",
      role: "business",
    };
    await api
      .post("/users")
      .send(user)
      .expect("Content-Type", /application\/json/)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe(user.name);
        expect(res.body.email).toBe(user.email);
        expect(res.body.role).toBe(user.role);
        expect(res.body).not.toHaveProperty("password");
        expect(res.body).toHaveProperty("restaurants");
      });
  });
});
