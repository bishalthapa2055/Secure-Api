import request from "supertest";
import { app } from "../../app";
import "../setup";

describe("Get all products", () => {
  it("should be defined", async () => {
    const res = await request(app).get("/ap1/v1/product");
    expect(res).toBeDefined();
  });
  it("should display the data present in database", async () => {
    const res = await request(app).get("/api/v1/product");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toBeDefined();
  });
});
