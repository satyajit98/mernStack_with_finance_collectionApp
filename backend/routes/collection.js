const express = require("express");
const {
  getAllCollections,
  getASingleCollection,
  postNewCollection,
  updateACollection,
  deleteACollection,
} = require("../controllers/collectionController");
const requireAuth = require("../middleware/requireAuth");

const router = express();

// require auth for all collection routes
router.use(requireAuth);

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
