import supertest from "supertest";
import app from "../app";

const api = supertest(app);
describe("endpoints", () => {
  test("ping", async () => {
    const res = await api.get("/ping");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("pong");
  });

  test("unknown endpoint", async () => {
    const res = await api.get("/unknown");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("unknown endpoint");
  });
});
