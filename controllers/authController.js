// // authController.js
// import jwt from "jsonwebtoken";

// export const generateToken = (user) => {
//   const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Set token expiration time as needed
//   return token;
// };

// export default generateToken;

import jwt from "jsonwebtoken";

// Function to create JWT token
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role, // Include the role property in the payload
  };

  // Sign the token with the payload and secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return token;
};

export default generateToken;
