import express from "express";
const router = express.Router();
import controller from "../controllers/adminControllers.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

router.get("/", controller.getAll);

router.get("/:id", controller.getAdminById);

router.post("/register", controller.post);
router.post("/login", controller.login);
router.put("/:id", controller.put);
router.delete("/:id", controller.deleteOne);

export default router;
