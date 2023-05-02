import { Request, Response } from "express";
import { Product } from "../../model/product";
import { BadRequestError } from "../../common/errors/bad-request-error";

const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      originalPrice,
      discountedPrice,
      discountedPercentage,
      subDescription,
      mainDescription,
    } = req.body;
    if (
      !name ||
      originalPrice ||
      discountedPercentage ||
      discountedPrice ||
      subDescription ||
      mainDescription
    ) {
      throw new BadRequestError("All fields are necessary");
    }
    const product = await Product.build({
      name,
      originalPrice,
      discountedPrice,
      discountedPercentage,
      subDescription,
      mainDescription,
    }).save();

    if (!product) {
      throw new BadRequestError("Failed to Create Product");
    }
    res.status(201).json({
      status: true,
      message: "Product created sucessfully",
      data: product,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      Error: (e as any).message
        ? (e as any).message
        : "Failed to Create . Debug Backend !!!",
    });
  }
};
export { createProduct as createProductHandler };
