import Training from "../models/trainingModel.js";
import fs from "fs";
import uploadImage from "../middleware/image.js";
// get all admins
export async function getAll(req, res, next) {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Paginate items using mongoose-paginate-v2
    const options = {
      page: pageNumber || 1,
      limit: limitNumber || 10,
    };

    const items = await Training.paginate({}, options);

    return res.status(200).json({
      items: items.docs,
      totalPages: items.totalPages,
      currentPage: items.page,
      limit: items.limit,
      totalItems: items.totalDocs,
    });
  } catch (err) {
    next(err);
  }
}

export async function getTrainingById(req, res) {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json(training);
  } catch (error) {
    console.error(`Error getting Training by ID: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
}

//add admin
export async function post(req, res, next) {
  try {
    const { title, description, image } = req.body;

    // Create the admin
    const training = await Training.create({
      title: title,
      description: description,
      image: image,
    });

    return res.status(201).json({ training });
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

export async function put(req, res, next) {
  let { id } = req.params;
  try {
    const oldTraining = await Training.findById(req.params.id);
    console.log(req.body.image);
    !req.body.image ? null : fs.unlinkSync(oldTraining.image);
    const response = await Training.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({ success: true, response });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

//delete admin
export async function deleteOne(req, res, next) {
  let { id } = req.params;
  try {
    const oldTraining = await Training.findById(req.params.id);
    if (!oldTraining) {
      return res.status(409).send({ message: "Training does not exists" });
    }
    fs.unlinkSync(oldTraining.image);
    const response = await Training.findOneAndDelete({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      response,
      message: "Training deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

const controller = {
  getAll,
  post,
  getTrainingById,
  put,
  deleteOne,
};

export default controller;
