import request from "supertest";
import { app } from "../../app";
import "../setup";

describe("Create Product features", () => {
  it("should be defined", async () => {
    const res = await request(app).post("/api/v1/product");
    expect(res).toBeDefined();
  });
  it("should sucessfully create product if all items are provided ", async () => {
    const productData = {
      name: "Bishal thapa",
      originalPrice: 10000,
      discountedPercentage: 10,
      subDescription: "Only few letters are required",
      mainDescription: "jkhfajdhfjka adjfdakh adfkja",
    };

    const res = await request(app).post("/api/v1/product").send(productData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.message).toBe("Product created sucessfully");
    expect(res.body.data).toBeDefined();
    expect(res.body.data).toHaveProperty("discountedPrice");
    expect(res.body.data).toHaveProperty("netTotal");
    expect(res.body.data.name).toBe(productData.name);
  });
});
