import Category from "../models/categoryModel.js";

class Controller {
  //   create a new category
  createCategory = async (req, res) => {
    try {
      console.log(req.body);
      const category = new Category(req.body);
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // Get all categories
  getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // Get category by id
  getCategoryById = async (req , res) => {
    try{
      const category = await Category.findById(req.params.id);
      if(!category) {
        return res.status(404).json({message : "Category not found."});
      }
      res.status(200).json(category);
    }catch(error){
      res.status(500).json({message : error.message});
    }
  }

  // Update category by id 

  updateCategoryById = async (req , res , next) => {
    let { id } = req.params;
    console.log(id);
    try{
      const category = await Category.findById(req.params.id);
      console.log(req.params.id)
      const response = await Category.findOneAndUpdate({_id : id} , req.body , {
        new : true,
      });
      res.status(200).send({success : true , response})

    }catch(error) {
      return next(error)
    }
    
  }

  // Delete  category by Id

  deleteCategoryById = async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

const controller = new Controller();
export default controller;
