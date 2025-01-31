import express from "express";
import {
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
} from "../controllers/fragranceController.js";

const router = express.Router(); // Import your model

// Define the GET /api/fragrances route
router.get("/", getAllFragrances);
router.get("/id", getFragranceById);
router.get("/name", getFragranceByName);
router.get("/brand", getFragranceByBrand);
router.get("/gender", getFragranceByGender);
router.get("/concentration", getFragranceByConcentration);
router.get("/season", getFragranceBySeason);
router.get("/notes", getFragranceByNotes);
router.get("/notes/base", getFragranceByBaseNotes);
router.get("/notes/middle", getFragrancesByMiddleNotes);
router.get("/notes/top", getFragrancesByTopNotes);
router.get("/sort/price", getFragrancesSortedByPrice);
export default router;
