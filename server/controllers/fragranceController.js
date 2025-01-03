const Fragrance = require("../models/fragranceModel");

const getAllFragrances = async (req, res) => {
  try {
    const fragrances = await Fragrance.find({});
    // Logs the data in console
    res.status(200).json(fragrances); // Sends the data as JSON
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message }); // Sends an error response
  }
};
const getFragranceById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Fragrance.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Fragrance not found" });
    }
    const UpdatedFragrance = await Fragrance.findById(id);
    res.status(200).json(UpdatedFragrance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getFragranceByName = async (req, res) => {
  try {
    const { name } = req.params;
    const fragrance = await Fragrance.find({ name: new RegExp(name, "i") });
    res.status(200).json(fragrance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getFragranceByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const fragrance = await Fragrance.find({ brand: new RegExp(brand, "i") });
    res.status(200).json(fragrance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getFragranceByGender = async (req, res) => {
  try {
    const { gender } = req.params;
    const fragrance = await Fragrance.find({
      gender: new RegExp(gender, "i"),
    });
    res.status(200).json(fragrance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getFragranceByConcentration = async (req, res) => {
  try {
    const { concentration } = req.params;
    const fragrance = await Fragrance.find({
      concentration: new RegExp(concentration, "i"),
    });
    res.status(200).json(fragrance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getFragranceBySeason = async (req, res) => {
  try {
    const { season } = req.params;
    const fragrance = await Fragrance.find({
      season: new RegExp(season, "i"),
    });
    res.status(200).json(fragrance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getFragranceByNotes = async (req, res) => {
  try {
    const { notes } = req.query; // Extract the notes from query parameters
    if (!notes) {
      return res.status(400).json({ message: "No notes provided" });
    }

    const notesArray = notes.split(",").map((note) => note.trim()); // Convert query to an array and trim spaces
    // console.log("Notes array:", notesArray); // Debugging: Log the notes array

    // Query fragrances where notes appear in top, middle, or base
    const fragrances = await Fragrance.find({
      $or: [
        {
          "notes.top": { $in: notesArray.map((note) => new RegExp(note, "i")) },
        },
        {
          "notes.middle": {
            $in: notesArray.map((note) => new RegExp(note, "i")),
          },
        },
        {
          "notes.base": {
            $in: notesArray.map((note) => new RegExp(note, "i")),
          },
        },
      ],
    });

    // console.log("Fragrances found:", fragrances); // Debugging: Log found fragrances

    if (fragrances.length === 0) {
      return res
        .status(404)
        .json({ message: "No fragrances found with the specified notes" });
    }

    res.status(200).json(fragrances); // Send the found fragrances as JSON
  } catch (error) {
    console.error("Error fetching fragrances:", error); // Debugging: Log the error
    res.status(500).json({ message: error.message });
  }
};

const getFragranceByBaseNotes = async (req, res) => {
  try {
    const { base } = req.query; // Extract the notes from query parameters
    if (!base) {
      return res.status(400).json({ message: "No notes provided" });
    }

    const baseArray = base.split(",").map((note) => note.trim()); // Convert query to an array and trim spaces
    // console.log("Notes array:", notesArray); // Debugging: Log the notes array

    // Query fragrances where notes appear in top, middle, or base
    const fragrances = await Fragrance.find({
      "notes.base": { $in: baseArray.map((note) => new RegExp(note, "i")) },
    });

    // console.log("Fragrances found:", fragrances); // Debugging: Log found fragrances

    if (fragrances.length === 0) {
      return res
        .status(404)
        .json({ message: "No fragrances found with the specified notes" });
    }

    res.status(200).json(fragrances); // Send the found fragrances as JSON
  } catch (error) {
    console.error("Error fetching fragrances:", error); // Debugging: Log the error
    res.status(500).json({ message: error.message });
  }
};

const getFragrancesByMiddleNotes = async (req, res) => {
  try {
    const { middle } = req.query; // Extract the notes from query parameters
    if (!middle) {
      return res.status(400).json({ message: "No notes provided" });
    }

    const middleArray = middle.split(",").map((note) => note.trim()); // Convert query to an array and trim spaces
    // console.log("Notes array:", notesArray); // Debugging: Log the notes array

    // Query fragrances where notes appear in top, middle, or base
    const fragrances = await Fragrance.find({
      "notes.middle": { $in: middleArray.map((note) => new RegExp(note, "i")) },
    });

    // console.log("Fragrances found:", fragrances); // Debugging: Log found fragrances

    if (fragrances.length === 0) {
      return res
        .status(404)
        .json({ message: "No fragrances found with the specified notes" });
    }

    res.status(200).json(fragrances); // Send the found fragrances as JSON
  } catch (error) {
    console.error("Error fetching fragrances:", error); // Debugging: Log the error
    res.status(500).json({ message: error.message });
  }
};

const getFragrancesByTopNotes = async (req, res) => {
  try {
    const { top } = req.query; // Extract the notes from query parameters
    if (!top) {
      return res.status(400).json({ message: "No notes provided" });
    }

    const topArray = top.split(",").map((note) => note.trim()); // Convert query to an array and trim spaces
    // console.log("Notes array:", notesArray); // Debugging: Log the notes array

    // Query fragrances where notes appear in top, middle, or base
    const fragrances = await Fragrance.find({
      "notes.top": { $in: topArray.map((note) => new RegExp(note, "i")) },
    });

    // console.log("Fragrances found:", fragrances); // Debugging: Log found fragrances

    if (fragrances.length === 0) {
      return res
        .status(404)
        .json({ message: "No fragrances found with the specified notes" });
    }

    res.status(200).json(fragrances); // Send the found fragrances as JSON
  } catch (error) {
    console.error("Error fetching fragrances:", error); // Debugging: Log the error
    res.status(500).json({ message: error.message });
  }
};

const getFragrancesSortedByPrice = async (req, res) => {
  try {
    const { order } = req.query;

    if (order && !["asc", "desc"].includes(order)) {
      return res
        .status(400)
        .json({ message: "Invalid sort order. Use 'asc' or 'desc'." });
    }

    const sortOrder = order === "desc" ? -1 : 1;

    const fragrances = await Fragrance.find({}).sort({ price: sortOrder });
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("Error fetching sorted fragrances:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
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
};
