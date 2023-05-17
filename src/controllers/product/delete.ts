import { Request, Response } from "express";
import { Product } from "../../model/product";
import { BadRequestError } from "../../common/errors/bad-request-error";

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isExists = await Product.findById(id);
    if (!isExists) {
      throw new BadRequestError("Unable to find the product");
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new BadRequestError("Failed to dellete");
    }
    res.status(200).json({ status: true, data: product });
  } catch (e) {
    res.status(400).json({ status: false, Error: (e as any).message });
  }
};

export { deleteProduct as deleteProductHandler };
