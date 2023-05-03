import { Request, Response } from "express";
import { Product } from "../../model/product";
import { BadRequestError } from "../../common/errors/bad-request-error";

const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      originalPrice,
      discountedPrice,
      discountedPercentage,
      subDescription,
      mainDescription,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) throw new BadRequestError("Unable to find Product");

    product.name = name || product.name;
    product.originalPrice = originalPrice || product.originalPrice;
    product.discountedPrice = discountedPrice || product.discountedPrice;
    product.discountedPercentage =
      discountedPercentage || product.discountedPercentage;
    product.mainDescription = mainDescription || product.mainDescription;
    product.subDescription = subDescription || product.subDescription;

    const updateProduct = await product.save();
    if (!updateProduct) {
      throw new BadRequestError("failed To update");
    }
    res.status(200).json({ data: updateProduct });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: (error as any).message
        ? (error as any).message
        : "Faild to update. Debug Backend!!!",
    });
  }
};

export { updateProduct as updataProductHandler };
