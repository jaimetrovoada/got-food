import supertest from "supertest";
import { initDb } from "../utils/testHelpers";
import app from "../app";
import path from "path";
import models from "../model";

const TIMEOUT = 100_000;
const api = supertest(app);

beforeEach(async () => {
  await initDb();
}, TIMEOUT);
describe("restaurants", () => {
  test("should get all restaurants", async () => {
    const res = await api.get("/restaurants");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("description");
    expect(res.body[0]).toHaveProperty("address");
    expect(res.body[0]).toHaveProperty("menuItems");
  });

  test("can add new restaurant", async () => {
    const filePath = path.join(__dirname, "pic.png");
    const res = await api
      .post("/restaurants")
      .field("name", "test")
      .field("description", "test")
      .field("address", "test")
      .attach("logo", filePath);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("address");
    expect(res.body).not.toHaveProperty("owner");
    expect(res.body).toHaveProperty("menuItems");
    expect(res.body).toHaveProperty("image");
    expect(res.body.image).toBe("/images/logo.png");
  });
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
