import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";

// Middleware to authenticate user
export const authenticateUser = async (req, res, next) => {
  try {
    // const token = req.cookies.token; // Assuming token is stored in a cookie
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify and decode JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check user role based on decoded token
    if (decodedToken.role === "user") {
      // User role
      const user = await User.findById(decodedToken.id);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Set user data in request object
      req.user = {
        id: user._id,
        email: user.email,
        role: decodedToken.role,
      };
      next();
    } else if (decodedToken.role === "admin") {
      // Admin role
      const admin = await Admin.findById(decodedToken.id);
      console.log(admin);

      if (!admin) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Set admin data in request object
      req.admin = {
        id: admin._id,
        email: admin.email,
        role: decodedToken.role,
      };
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
