// protectedRoutes.js
import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route for user
router.get("/user/profile", authenticateUser, (req, res) => {
  // Access the authenticated user data from the request object
  const { id, email, role } = req.user;
  res.json({ id, email, role });
});

// Protected route for admin
router.get("/admin/profile", authenticateUser, (req, res) => {
  // Access the authenticated admin data from the request object
  const { id, email, role } = req.user;
  res.json({ id, email, role });
});

export default router;
