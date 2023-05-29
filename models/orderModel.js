import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new Schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    isHidden: {
      type: Boolean,
      required: [true, "Please provide if it's hidden or not"],
      default: false,
    },
  },
  {
    collection: "orders",
  }
);

orderSchema.plugin(mongoosePaginate);
orderSchema.pre(["find", "findOne"], function () {
  this.populate("user");
});

orderSchema.pre(["find", "findOne"], function () {
  this.populate("products");
});

const Order = model("Order", orderSchema);
export default Order;
