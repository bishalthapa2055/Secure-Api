import { Router } from "express";
import { getAllUsersHandler } from "../../../controllers/user/get-all";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { currentUser } from "../../../common/middlewares/current-user";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";
import { validateRequest } from "../../../common/middlewares/validate-request";


const router= Router();


router.get("/", currentUser , requireAuth ,  authorization([Role.admin]),validateRequest,getAllUsersHandler)


export {router as getAllUsersRouter}