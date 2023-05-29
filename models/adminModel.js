import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate-v2";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const adminSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter a full name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      match: [emailRegex, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  {
    collection: "admins",
  }
);

adminSchema.plugin(mongoosePaginate);

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const Admin = model("Admin", adminSchema);
export default Admin;
