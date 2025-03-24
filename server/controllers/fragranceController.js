import Fragrance from "../models/fragranceModel.js";

import { getCachedData, setCacheData } from "../lib/redisClientFuntions.js";

export const getAllFragrances = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Use query params, default to 10
  const cacheKey = `fragrances:all:limit-${limit}`; // Unique key based on limit

  try {
    // 🔹 Step 1: Check Redis Cache
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching all fragrances from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // 🔹 Step 2: Fetch Data from MongoDB
    const fragrances = await Fragrance.find({}).limit(limit);

    if (fragrances.length === 0) {
      return res.status(404).json({ message: "No fragrances found" });
    }

    // 🔹 Step 3: Store in Cache (Expires in 10 minutes)
    await setCacheData(cacheKey, JSON.stringify(fragrances), 600);

    console.log("📡 Fetching all fragrances from MongoDB");
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getFragranceById = async (req, res) => {
  try {
    const { id } = req.query; // ID from query
    const cacheKey = `fragrances${id}`;

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by ID from Redis cache");
      return res.status(200).json(cachedData);
    }
    const fragrance = await Fragrance.findById(id);
    if (!fragrance) {
      return res.status(404).json({ message: "Fragrance not found" });
    }
    await setCacheData(cacheKey, fragrance);
    console.log("📡 Fetching fragrances from MongoDB");
    res.status(200).json(fragrance);
  } catch (error) {
    console.error("❌ Error fetching fragrance by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceByName = async (req, res) => {
  try {
    const { name } = req.query; // Name from query
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10
    const cacheKey = `fragrances:name:${name}`;

    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by name from Redis cache");
      return res.status(200).json(cachedData);
    }

    const fragrances = await Fragrance.find({
      name: new RegExp(name, "i"),
    }).limit(limit);

    console.log("📡 Fetching fragrances from MongoDB");
    await setCacheData(cacheKey, fragrances);
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("❌ Error fetching fragrance by name:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceByBrand = async (req, res) => {
  try {
    const { brand } = req.query; // Brand from query
    const limit = parseInt(req.query.limit);
    const cacheKey = `fragrances:brand:${brand}`;

    if (!brand) {
      return res.status(400).json({ message: "Brand is required." });
    }

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by brand from Redis cache");
      return res.status(200).json(cachedData);
    }
    const fragrance = await Fragrance.find({
      brand: new RegExp(brand, "i"),
    }).limit(limit);
    console.log("📡 Fetching fragrances from MongoDB");

    await setCacheData(cacheKey, fragrance);

    res.status(200).json(fragrance);
  } catch (error) {
    console.error("Error fetching fragrance by brand:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceByGender = async (req, res) => {
  try {
    const { gender } = req.query; // Gender from query
    const limit = parseInt(req.query.limit);
    const cacheKey = `fragrances:gender:${gender}`;

    if (!gender) {
      return res.status(400).json({ message: "Gender is required." });
    }

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by gender from Redis cache");
      return res.status(200).json(cachedData);
    }

    const fragrances = await Fragrance.find({
      gender: gender.toLowerCase(),
    }).limit(limit);
    console.log("📡 Fetching fragrances from MongoDB");

    await setCacheData(cacheKey, fragrances);
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("Error fetching fragrance by gender:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceByConcentration = async (req, res) => {
  try {
    const { concentration } = req.query; // Concentration from query
    const limit = parseInt(req.query.limit);
    const cacheKey = `fragrances:concentration:${concentration}`;

    if (!concentration) {
      return res.status(400).json({ message: "Concentration is required." });
    }

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by concentration from Redis cache");
      return res.status(200).json(cachedData);
    }

    const fragrances = await Fragrance.find({
      concentration: new RegExp(concentration, "i"),
    }).limit(limit);
    console.log("📡 Fetching fragrances from MongoDB");

    await setCacheData(cacheKey, fragrances);
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("Error fetching fragrance by concentration:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceBySeason = async (req, res) => {
  try {
    const { season } = req.query; // Season from query
    const limit = parseInt(req.query.limit);
    if (!season) {
      return res.status(400).json({ message: "Season is required." });
    }
    const fragrances = await Fragrance.find({
      season: new RegExp(season, "i"),
    }).limit(limit);
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("Error fetching fragrance by season:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceByNotes = async (req, res) => {
  try {
    const { notes } = req.query; // Notes from query
    const limit = parseInt(req.query.limit);
    const cacheKey = `fragrances:notes:${notes}`;

    if (!notes) {
      return res.status(400).json({ message: "Notes are required." });
    }

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by notes from Redis cache");
      return res.status(200).json(cachedData);
    }

    const notesArray = notes.split(",").map((note) => note.trim());
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
    }).limit(limit);

    console.log(`📡 Fetching fragrances for notes "${notes}" from MongoDB`);
    await setCacheData(cacheKey, fragrances);
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("❌ Error fetching fragrance by notes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceByBaseNotes = async (req, res) => {
  try {
    const { base } = req.query; // Base notes from query
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10
    const cacheKey = `fragrances:notes:base:${base}`;

    if (!base) {
      return res.status(400).json({ message: "Base notes are required." });
    }

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by base notes from Redis cache");
      return res.status(200).json(cachedData);
    }

    const baseArray = base.split(",").map((note) => note.trim());
    const fragrances = await Fragrance.find({
      "notes.base": { $in: baseArray.map((note) => new RegExp(note, "i")) },
    }).limit(limit);

    console.log("📡 Fetching fragrances from MongoDB");

    await setCacheData(cacheKey, fragrances);

    res.status(200).json(fragrances);
  } catch (error) {
    console.error("❌ Error fetching fragrance by base notes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragrancesByMiddleNotes = async (req, res) => {
  try {
    const { middle } = req.query; // Middle notes from query
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10
    const cacheKey = `fragrances:notes:middle:${middle}`;

    if (!middle) {
      return res.status(400).json({ message: "Middle notes are required." });
    }

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by middle notes from Redis cache");
      return res.status(200).json(cachedData);
    }

    const middleArray = middle.split(",").map((note) => note.trim());
    const fragrances = await Fragrance.find({
      "notes.middle": { $in: middleArray.map((note) => new RegExp(note, "i")) },
    }).limit(limit);

    console.log("📡 Fetching fragrances from MongoDB");
    await setCacheData(cacheKey, fragrances);
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("❌ Error fetching fragrance by middle notes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragrancesByTopNotes = async (req, res) => {
  try {
    const { top } = req.query; // Top notes from query
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10
    const cacheKey = `fragrances:notes:top:${top}`;

    if (!top) {
      return res.status(400).json({ message: "Top notes are required." });
    }

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by top notes from Redis cache");
      return res.status(200).json(cachedData);
    }

    const topArray = top.split(",").map((note) => note.trim());
    const fragrances = await Fragrance.find({
      "notes.top": { $in: topArray.map((note) => new RegExp(note, "i")) },
    }).limit(limit);

    console.log("📡 Fetching fragrances from MongoDB");
    await setCacheData(cacheKey, fragrances);
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("❌ Error fetching fragrance by top notes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragrancesSortedByPrice = async (req, res) => {
  try {
    const { order } = req.query;
    const limit = parseInt(req.query.limit) || 0; // Default limit to 10
    const cacheKey = `fragrances:sorted:price:${order}`;

    if (!["asc", "desc"].includes(order)) {
      return res
        .status(400)
        .json({ message: "Invalid sort order. Use 'asc' or 'desc'." });
    }

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching sorted fragrances from Redis cache");
      return res.status(200).json(cachedData);
    }

    const fragrances = await Fragrance.find({})
      .sort({ price: order === "asc" ? 1 : -1 })
      .limit(limit);

    console.log("📡 Fetching sorted fragrances from MongoDB");
    await setCacheData(cacheKey, fragrances);
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("Error fetching sorted fragrances:", error);
    res.status(500).json({ message: error.message });
  }
};
