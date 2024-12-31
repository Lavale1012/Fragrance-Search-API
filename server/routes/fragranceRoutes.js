const express = require("express");
const router = express.Router(); // Import your model
const {
  getAllFragrances,
  getFragranceById,
  getFragranceByName,
  getFragranceByBrand,
  getFragranceByGender,
  getFragranceByConcentration,
  getFragranceBySeason,
  getFragranceByNotes,
  getFragranceByBaseNotes,
  getFragrancesSortedByPrice,
  getFragrancesByMiddleNotes,
  getFragrancesByTopNotes,
} = require("../controllers/fragranceController");

// Define the GET /api/fragrances route
router.get("/", getAllFragrances);
router.get("/search/id/:id", getFragranceById);
router.get("/search/name/:name", getFragranceByName);
router.get("/search/brand/:brand", getFragranceByBrand);
router.get("/search/gender/:gender", getFragranceByGender);
router.get("/search/concentration/:concentration", getFragranceByConcentration);
router.get("/search/season/:season", getFragranceBySeason);
router.get("/search/notes", getFragranceByNotes);
router.get("/search/notes/base", getFragranceByBaseNotes);
router.get("/search/notes/middle", getFragrancesByMiddleNotes);
router.get("/search/notes/top", getFragrancesByTopNotes);
router.get("/search/sort/price", getFragrancesSortedByPrice);

module.exports = router;
