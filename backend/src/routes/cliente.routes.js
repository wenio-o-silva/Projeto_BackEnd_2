import { Router } from "express";
import ClienteController from "../controllers/ClienteController.js";

const router = Router();

router.post("/", ClienteController.create);
router.get("/", ClienteController.index);
router.put("/:id", ClienteController.update);
router.delete("/:id", ClienteController.delete);

export default router;