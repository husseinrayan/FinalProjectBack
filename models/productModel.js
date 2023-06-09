import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:false
    },
    name: {
      type: String,
      required: [true, "Provide a Name for the product"],
    },
    description: {
      type: String,
      maxLength: 200,
    },
    image: {
      type: String,
      // required: [true, "Please upload a picture for the product"],
    },
    isTaken: {
      type: Boolean,
      default: false,
    },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  {
    collection: "products",
  }
);
productSchema.plugin(mongoosePaginate);

productSchema.pre(["find", "findOne"], function () {
  this.populate("user");
});

productSchema.pre(["find", "findOne"], function () {
  this.populate("category");
});

const productModel = model("products", productSchema);

export default productModel;
