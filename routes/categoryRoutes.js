import express from "express";
const router = express.Router();

import controller from "../controllers/categoryControllers.js";

router.get("/", controller.getAllCategories);
router.post("/", controller.createCategory);
router.delete(
  "/:id",
  controller.deleteCategoryById,
  
);
router.get("/:id", controller.getCategoryById);
router.put("/:id" , controller.updateCategoryById);
export default router;
