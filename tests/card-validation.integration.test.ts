import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("POST /api/validate", () => {
  it("returns 400 when cardNumber is missing", async () => {
    const res = await request(app).post("/api/validate").send({});
    expect(res.status).toBe(400);
  });

  it("returns 200 with isValid true for a valid card", async () => {
    const res = await request(app)
      .post("/api/validate")
      .send({ cardNumber: "4111111111111111" });
    expect(res.status).toBe(200);
    expect(res.body.isValid).toBe(true);
  });

  it("returns 200 with isValid false for a genuinely invalid card", async () => {
    const res = await request(app)
      .post("/api/validate")
      .send({ cardNumber: "1234567890123" });
    expect(res.status).toBe(200);
    expect(res.body.isValid).toBe(false);
  });
});
