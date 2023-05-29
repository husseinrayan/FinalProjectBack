import express from "express";
const router = express.Router();
import {
  signup_user,
  user_login,
  delete_user,
  getAllUsers,
  getUserById,
  editUser,
} from "../controllers/userController.js";
// import checkUser from "../middleware/check-user.js";

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", editUser);
router.patch("/:id", editUser);

router.post("/register", signup_user);
router.post("/login", user_login);
router.delete("/:id", delete_user);

export default router;
