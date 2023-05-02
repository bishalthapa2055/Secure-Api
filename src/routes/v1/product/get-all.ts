import { Router } from "express";
import { getAllProductHandler } from "../../../controllers/product/get-all";

const router = Router();


router.get("/", getAllProductHandler);

export{router as getAllProductRouter}