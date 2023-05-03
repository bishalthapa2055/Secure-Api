import { Router } from "express";
import { updataProductHandler } from "../../../controllers/product/update";
import { param } from "express-validator";
import { isValidObjectId } from "../../../services/object-id-validates";
import { validateRequest } from "../../../common/middlewares/validate-request";

const router = Router();

router.patch(
  "/:id",
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Invalid Id"),
  ],
  validateRequest,
  updataProductHandler
);

export { router as updateProductRouter };
