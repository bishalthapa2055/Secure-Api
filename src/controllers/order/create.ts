import { Request, Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { Order } from "../../model/order";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { orderName, userId, productId, orderedQuantity } = req.body;
    if (!orderName) {
      throw new BadRequestError("Order name is required");
    }
    if (!userId) {
      throw new BadRequestError("User is required");
    }
    if (!productId) {
      throw new BadRequestError("Please select product");
    }
    if (!orderedQuantity) {
      throw new BadRequestError("Please select quantity");
    }

    const order = await Order.build({
      orderName,
      userId,
      productId,
      orderedQuantity,
    }).save();

    if (!order) {
      throw new BadRequestError("Faild to order");
    }

    res.status(201).json({ statu: true, data: order });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as any).message
        ? (error as any).message
        : "failed to create. Debug Backend !!!",
    });
  }
};

export { createOrder as createOrderHandler };
