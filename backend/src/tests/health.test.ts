import request from "supertest";
import app from "../app";

describe("Health API", () => {
  it("should return API running", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "API is running",
    });
  });
});