const Collection = require("../models/collectionModel");
const mongoose = require("mongoose");

// get all Collections
const getAllCollections = async (req, res) => {
  const data = await Collection.find({}).sort({ createdAt: -1 });
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single Collection
const getASingleCollection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This is not a valid ObjectID" });
  }
  const data = await Collection.findById(id);
  if (!data) {
    return res.status(400).json({ error: "No Such Data" });
  }

  res.status(200).json(data);
};

// create new Collection
const postNewCollection = async (req, res) => {
  const { full_name, price, location, ph_number } = req.body;

  let emptyFields = [];

  if (!full_name) {
    emptyFields.push("full_name");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!location) {
    emptyFields.push("location");
  }
  if (!ph_number) {
    emptyFields.push("ph_number");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to DB
  try {
    const collection = await Collection.create({
      full_name,
      price,
      location,
      ph_number,
    });
    res.status(200).json(collection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a Collection
const updateACollection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This is not a valid ObjectID" });
  }
  const data = await Collection.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!data) {
    return res.status(404).json({ msg: "Data Not exists" });
  }
  res.status(200).json(data);
};
// delete a Collection
const deleteACollection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This is not a valid ObjectID" });
  }
  const data = await Collection.findOneAndDelete({ _id: id });
  if (!data) {
    return res.status(404).json({ msg: "Data Not exists" });
  }
  res.status(200).json(data);
};
module.exports = {
  getAllCollections,
  getASingleCollection,
  postNewCollection,
  updateACollection,
  deleteACollection,
};
