import request from "supertest";
import { app } from "../../app";
import "../setup";

describe("Update Product", () => {
  it("should be defined", async () => {
    const id = "6416741d80a1ccd678999922";
    const res = await request(app).patch(`/api/v1/product/${id}`);
    expect(res).toBeDefined();
  });

  it("should return 200 after sucessful update", async () => {
    const productData = {
      name: "Bishal thapa",
      originalPrice: 10000,
      discountedPercentage: 10,
      subDescription: "Only few letters are required",
      mainDescription: "jkhfajdhfjka adjfdakh adfkja",
    };
    const creteProduct = await request(app)
      .post("/api/v1/product")
      .send(productData);
    expect(creteProduct).toBeDefined();
    expect(creteProduct.statusCode).toBe(201);
    expect(creteProduct.body.data).toHaveProperty("id");
    expect(creteProduct.body.data).toHaveProperty("netTotal");

    const updateData = {
      name: "thapaSir",
      discountedPercentage: 20,
    };

    const res = await request(app)
      .patch(`/api/v1/product/${creteProduct.body.data.id}`)
      .send(updateData);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe("thapaSir");
  });

  it("should return 400 if not valid id is provided", async () => {
    const productData = {
      name: "Bishal thapa",
      originalPrice: 10000,
      discountedPercentage: 10,
      subDescription: "Only few letters are required",
      mainDescription: "jkhfajdhfjka adjfdakh adfkja",
    };
    const creteProduct = await request(app)
      .post("/api/v1/product")
      .send(productData);
    expect(creteProduct).toBeDefined();
    expect(creteProduct.statusCode).toBe(201);
    expect(creteProduct.body.data).toHaveProperty("id");
    expect(creteProduct.body.data).toHaveProperty("netTotal");

    const updateData = {
      name: "thapaSir",
      discountedPercentage: 20,
    };

    const notId = "6416741d80a1ccd678999922";
    const res = await request(app)
      .patch(`/api/v1/product/${notId}`)
      .send(updateData);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBeFalsy();
    expect(res.body.Error).toBe("Unable to find Product");
  });

  it("should display failed to update message while updating", async () => {
    const productData = {
      name: "Bishal thapa",
      originalPrice: 10000,
      discountedPercentage: 10,
      subDescription: "Only few letters are required",
      mainDescription: "jkhfajdhfjka adjfdakh adfkja",
    };
    const creteProduct = await request(app)
      .post("/api/v1/product")
      .send(productData);
    expect(creteProduct).toBeDefined();
    expect(creteProduct.statusCode).toBe(201);
    expect(creteProduct.body.data).toHaveProperty("id");
    expect(creteProduct.body.data).toHaveProperty("netTotal");

    const updateData = {
      name: "thapaSir",
      discountedPercentage: 20,
    };
    const res = await request(app)
      .patch(`/api/v1/product/${creteProduct.body.data.id}`)
      .send(updateData);

    if (!res) {
      //   console.log("hit");
      //   console.log(res, "[res]");
      expect(res).toBeDefined();
    }
  });
});
