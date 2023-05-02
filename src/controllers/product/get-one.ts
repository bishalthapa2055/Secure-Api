import { Request, Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { Product } from "../../model/product";

const getOneProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError("Id is needed");
    }
    const product = await Product.findById(id);
    if (!product) {
      throw new BadRequestError("Unable to find the product");
    }
    res.status(200).json({ status: true, data: product });
  } catch (e) {
    res.status(400).json({ status: false, Error: (e as any).message });
  }
};

export { getOneProduct as getOneProductHandler };
