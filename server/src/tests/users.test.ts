import supertest from "supertest";
import app from "../app";
import testHelpers from "../utils/testHelpers";

const TIMEOUT = 100_000;

const api = supertest(app);
describe("users", () => {
  beforeEach(async () => {
    testHelpers.emptyDb();
  }, TIMEOUT);

  test(
    "can register customer user",
    async () => {
      const user = {
        name: "user1",
        email: "wario@gmail.com",
        password: "abc12345",
        role: "customer",
      };
      const res = await api.post("/users/register").send(user);
      expect(res.status).toBe(201);
      expect(res.body.name).toBe(user.name);
      expect(res.body.email).toBe(user.email);
      expect(res.body.role).toBe(user.role);
      expect(res.body.passwordHash).not.toBeDefined();
      expect(res.body.password).not.toBeDefined();
    },
    TIMEOUT
  );

  test("error if role is unsupported", async () => {
    const user = {
      name: "user1",
      email: "wario@gmail.com",
      password: "abc12345",
      role: "admin",
    };

    const res = await api.post("/users/register").send(user);

    expect(res.body.error[0]).toContain(
      "Expected 'customer' | 'business', received 'admin'"
    );
    expect(res.status).toBe(400);
  });

  test("can handle multiple zod validation errors", async () => {
    const user = {
      name: "user1",
      email: "wario@gmail.com",
      password: "abc123",
      role: "admin",
    };

    const res = await testHelpers.userCreation(api, user);

    expect(res.body.error[0]).toContain("Password");
    expect(res.body.error[1]).toContain(
      "Expected 'customer' | 'business', received 'admin'"
    );
    expect(res.status).toBe(400);
  });

  test("can login", async () => {
    const user = {
      name: "user1",
      email: "wario@gmail.com",
      password: "abc12345",
      role: "customer",
    };

    await testHelpers.userCreation(api, user);

    const res = await testHelpers.userLogin(api, {
      email: user.email,
      password: user.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
