import request from "supertest";
import { app } from "../../app";

import "../setup";

describe("for delete methods", () => {
  it("should be defined", async () => {
    const res = await request(app).delete("/api/v1/product");
    expect(res).toBeDefined();
  });
  it("should return status code 200 after sucesful delete", async () => {
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

    const deleteProduct = await request(app).delete(
      `/api/v1/product/${creteProduct.body.data.id}`
    );
    expect(deleteProduct.statusCode).toBe(200);
    expect(deleteProduct.body.status).toBeTruthy();
    expect(deleteProduct.body.deletedData).toBeDefined();
  });

  it("should not delete the product if there id doesnot exists", async () => {
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

    const notId = "6416741d80a1ccd678999922";
    const deleteProduct = await request(app).delete(`/api/v1/product/${notId}`);
    expect(deleteProduct.statusCode).toBe(400);
    expect(deleteProduct.body.status).toBeFalsy();
    expect(deleteProduct.body.Error).toBe("Unable to find the product");
  });

  it("should check the id format", async () => {
    const id = "12323123123kjkjkjk1";
    const res = await request(app).delete(`/api/v1/product/${id}`);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    // console.log(res);
    expect(res.text).toEqual(
      //     {
      //   status: false,
      //   error: [
      //     {
      //       type: "field",
      //       value: "12323123123kjkjkjk1",
      //       msg: "Invalid Id",
      //       path: "id",
      //       location: "params",
      //     },
      //   ],
      // }
      '{"status":false,"error":[{"type":"field","value":"12323123123kjkjkjk1","msg":"Invalid Id","path":"id","location":"params"}]}'
    );
  });
});
