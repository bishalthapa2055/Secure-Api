import { Router } from "express";
import { updataProductHandler } from "../../../controllers/product/update";
import { param } from "express-validator";
import { isValidObjectId } from "../../../services/object-id-validates";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";

const router = Router();

router.patch(
  "/:id",
  currentUser,
  requireAuth,
  authorization([Role.admin]),
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
