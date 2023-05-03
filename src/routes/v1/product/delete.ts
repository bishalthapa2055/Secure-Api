import { Router } from "express";
import { deleteProductHandler } from "../../../controllers/product/delete";
import { param } from "express-validator";
import { isValidObjectId } from "../../../services/object-id-validates";
import { validateRequest } from "../../../common/middlewares/validate-request";

const router = Router();

router.delete(
  "/:id",
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Invalid Id"),
  ],
  validateRequest,
  deleteProductHandler
);

export { router as deleteProductRouter };
