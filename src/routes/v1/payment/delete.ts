import { Router } from "express";
import { deletPaymentHandler } from "../../../controllers/payment/delete";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { param } from "express-validator";
import { isValidObjectId } from "../../../services/object-id-validates";



const router     = Router();

router.delete("/:id", currentUser , requireAuth , authorization([Role.admin]),
[
    param("id")
    .notEmpty()
    .custom((id) => isValidObjectId(id))
    .withMessage("Invalid Id")
]
,validateRequest,deletPaymentHandler)


export {router as deletePaymentRouter}