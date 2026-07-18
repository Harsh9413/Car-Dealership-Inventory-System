import request from "supertest";
import app from "../../app";

describe("POST /api/auth/register", () => {
  it("should register a user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Harsh",
        email: "harsh@example.com",
        password: "Password123",
      });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User registered successfully");

    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.name).toBe("Harsh");
    expect(response.body.data.email).toBe("harsh@example.com");
    expect(response.body.data.role).toBe("user");
  });
});