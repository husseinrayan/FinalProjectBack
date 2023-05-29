import express from "express";
const router = express.Router();
import controller from "../controllers/trainingControllers.js";
import uploadImage from "../middleware/image.js";

router.get("/", controller.getAll);

router.get("/:id", controller.getTrainingById);

router.post("/", uploadImage.uploadImage, controller.post);
router.put("/:id", uploadImage.uploadImage, controller.put);
router.delete("/:id", controller.deleteOne);

export default router;
