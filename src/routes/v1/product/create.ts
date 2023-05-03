import { Router } from "express";
import { createProductHandler } from "../../../controllers/product/create";
import { body } from "express-validator";
import { validateRequest } from "../../../common/middlewares/validate-request";

const router = Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Product Name is required"),
    body("originalPrice").notEmpty().withMessage("Original Price is required"),
    body("discountedPercentage")
      .notEmpty()
      .isNumeric()
      .withMessage("Percentage must be number and required"),
    body("subDescription")
      .notEmpty()
      .isLength({ min: 20 })
      .withMessage("Too Short"),
    body("mainDescription").notEmpty().withMessage("Required Main Description"),
  ],
  validateRequest,
  createProductHandler
);

export { router as createProductRouter };
