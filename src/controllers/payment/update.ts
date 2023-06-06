import { Request, Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { Payment } from "../../model/payment";

const updatePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, productId, orderId, payment_via, price } = req.body;

    if (!userId) {
      throw new BadRequestError("User is required");
    }
    if (!productId) {
      throw new BadRequestError("Do select product");
    }
    if (!orderId) {
      throw new BadRequestError("OrderIs s required");
    }
    if (!price) {
      throw new BadRequestError("Price is required");
    }

    const payment = await Payment.build({
      userId,
      productId,
      orderId,
      payment_via,
      price,
    }).save();

    if (!payment) {
      throw new BadRequestError("Unable to create Payment ");
    }
    res.status(201).json({
      status: true,
      message: "Payment created sucessfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: (error as any).message
        ? (error as any).message
        : "failed to update payment",
    });
  }
};

export { updatePayment as updatePaymentHandler };
