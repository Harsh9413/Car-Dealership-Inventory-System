import request from "supertest";
import app from "../../app";

describe("POST /api/auth/register", () => {
  it("should return 404 because route does not exist yet", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Harsh",
        email: "harsh@example.com",
        password: "Password123",
      });

    expect(response.status).toBe(201);
  });
});