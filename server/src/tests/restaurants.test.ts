import supertest from "supertest";
import testHelpers from "../utils/testHelpers";
import app from "../app";
import path from "path";
import models from "../model";

const TIMEOUT = 100_000;
const api = supertest(app);

beforeEach(async () => {
  await testHelpers.emptyDb();
}, TIMEOUT);

describe("restaurants", () => {
  test(
    "can create new restaurant",
    async () => {
      const user = {
        name: "test",
        email: "test@gmail.com",
        password: "abc12345",
        role: "business",
      };
      const filePath = path.join(__dirname, "pic.png");

      await testHelpers.userCreation(api, user);
      const login = await testHelpers.userLogin(api, {
        email: user.email,
        password: user.password,
      });

      const token = login.body.token;
      const res = await api
        .post("/restaurants")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "test")
        .field("description", "test")
        .field("address", "test")
        .attach("logo", filePath, { filename: "testLogo.png" });

      console.log({ res: res.body });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("description");
      expect(res.body.logo).not.toHaveLength(0);
    },
    TIMEOUT
  );
});

describe("menu", () => {
  test("can get menu items", async () => {
    const restaurant = await models.Restaurant.findOne({ name: "restaurant1" });

    const res = await api.get(`/restaurants/${restaurant.id}/menu`);
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("category");
    expect(res.body[0]).toHaveProperty("description");
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("image");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("price");
    expect(res.body.length).toBe(3);
  });
});
