import { Router } from "express";
import { getAllProductHandler } from "../../../controllers/product/get-all";
import { currentUser } from "../../../common/middlewares/current-user";
const router = Router();

router.get("/", currentUser, getAllProductHandler);

export { router as getAllProductRouter };
