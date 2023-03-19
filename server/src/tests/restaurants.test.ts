import supertest from "supertest";
import { initDb } from "./helpers";
import app from "../app";

const TIMEOUT = 100_000;
const api = supertest(app);

describe("restaurants", () => {
  beforeEach(async () => {
    await initDb();
  }, TIMEOUT);

  test("should get all restaurants", async () => {
    const res = await api.get("/restaurants");

    console.log({ res: res.body });

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("description");
    expect(res.body[0]).toHaveProperty("address");
    expect(res.body[0]).toHaveProperty("menuItems");
  });
});
