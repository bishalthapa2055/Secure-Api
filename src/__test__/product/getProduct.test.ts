import request from "supertest";
import { app } from "../../app";
import "../setup";

describe("Get all products", () => {
  it("should be defined", async () => {
    const res = await request(app).get("/ap1/v1/product");
    expect(res).toBeDefined();
  });
});
