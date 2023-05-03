import { Router } from "express";
import { getOneProductHandler } from "../../../controllers/product/get-one";
import { param } from "express-validator";
import { isValidObjectId } from "../../../services/object-id-validates";
import { validateRequest } from "../../../common/middlewares/validate-request";

const router = Router();

router.get(
  "/:id",
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Invalid Id"),
  ],
  validateRequest,
  getOneProductHandler
);

export { router as getOneProductRouter };
