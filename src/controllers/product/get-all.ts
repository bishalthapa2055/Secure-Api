import { Request, Response } from "express";
import { Product } from "../../model/product";
import { BadRequestError } from "../../common/errors/bad-request-error";

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const productList = await Product.find();
    if (!productList) {
      throw new BadRequestError("Failed to get Products");
    }
    res.status(200).json({ status: true, products: productList });
  } catch (e) {
    res.status(400).json({
      Error: (e as any).message ? (e as any).message : "Failed to get Products",
    });
  }
};

export { getAllProduct as getAllProductHandler };
