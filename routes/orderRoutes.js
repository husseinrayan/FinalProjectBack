import express from "express";
const router = express.Router();
import controller from "../controllers/orderController.js";

router.get("/", controller.getAllOrder);

router.get("/:id", controller.getOrder);

router.post("/", controller.addOrder);
router.patch("/:id", controller.putOrder);
router.delete("/:id", controller.deleteOrder);

export default router;
