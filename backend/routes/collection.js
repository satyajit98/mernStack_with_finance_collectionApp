const express = require("express");
const {
  getAllCollections,
  getASingleCollection,
  postNewCollection,
  updateACollection,
  deleteACollection,
} = require("../controllers/collectionController");
const router = express();

// Get all details
router.get("/", getAllCollections);

// Get a details
router.get("/:id", getASingleCollection);

// Post a new details
router.post("/", postNewCollection);

// Update a details
router.patch("/:id", updateACollection);

//Delete a details
router.delete("/:id", deleteACollection);

module.exports = router;
