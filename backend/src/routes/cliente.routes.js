import { Router } from "express";
import ClienteController from "../controllers/ClienteController.js";

const router = Router();

router.post("/", ClienteController.create);
router.get("/", ClienteController.index);

export default router;