import express from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;

const app = new express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running!");
});
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/", protectedRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/donation", trainingRoutes);
app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!`)
);
