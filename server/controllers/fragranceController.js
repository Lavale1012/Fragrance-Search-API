import Fragrance from "../models/fragranceModel.js";
import redisClient from "../redisClient.js";

export const getAllFragrances = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10
    const cacheKey = "fragrance";

    // Check if data exists in Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If not found in Redis, fetch from MongoDB
    const fragrances = await Fragrance.find({}).limit(limit);
    if (fragrances.length === 0) {
      return res.status(404).json({ message: "No fragrances found" });
    }

    // Store in Redis with expiry (600s = 10 minutes)
    await redisClient.setEx(`fragrances`, 600, JSON.stringify(fragrances));

    console.log("📡 Fetching fragrances from MongoDB");
    await redisClient.setEx(cacheKey, 600, JSON.stringify(fragrances));
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

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by ID from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }
    const fragrance = await Fragrance.findById(id);
    if (!fragrance) {
      return res.status(404).json({ message: "Fragrance not found" });
    }
    await redisClient.setEx(`fragrances${id}`, 600, JSON.stringify(fragrance));
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
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }
    const fragrance = await Fragrance.find({ name: new RegExp(name, "i") });
    res.status(200).json(fragrance);
  } catch (error) {
    console.error("Error fetching fragrance by name:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceByBrand = async (req, res) => {
  try {
    const { brand } = req.query; // Brand from query
    const limit = parseInt(req.query.limit);
    const cacheKey = `fragrances:brand:${brand}`;
    const cachedData = await redisClient.get(cacheKey);

    if (!brand) {
      return res.status(400).json({ message: "Brand is required." });
    }

    if (cachedData) {
      console.log("🚀 Fetching fragrances by brand from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }
    const fragrance = await Fragrance.find({
      brand: new RegExp(brand, "i"),
    }).limit(limit);
    console.log("📡 Fetching fragrances from MongoDB");

    await redisClient.setEx(cacheKey, 600, JSON.stringify(fragrance));

    res.status(200).json(fragrance);
  } catch (error) {
    console.error("Error fetching fragrance by brand:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceByGender = async (req, res) => {
  // this one is ok
  try {
    const { gender } = req.query; // Gender from query
    const limit = parseInt(req.query.limit);
    const cacheKey = `fragrances:gender:${gender}`;

    if (!gender) {
      return res.status(400).json({ message: "Gender is required." });
    }

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by gender from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const fragrances = await Fragrance.find({
      gender: gender.toLowerCase(),
    }).limit(limit);
    console.log("📡 Fetching fragrances from MongoDB");

    await redisClient.setEx(cacheKey, 600, JSON.stringify(fragrances));
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

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by concentration from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const fragrances = await Fragrance.find({
      concentration: new RegExp(concentration, "i"),
    }).limit(limit);
    console.log("📡 Fetching fragrances from MongoDB");

    await redisClient.setEx(cacheKey, 600, JSON.stringify(fragrances));
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("Error fetching fragrance by concentration:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragranceBySeason = async (req, res) => {
  // this is ok
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

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by notes from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
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
    await redisClient.setEx(cacheKey, 600, JSON.stringify(fragrances));
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

    // Ensure Redis is connected
    if (!redisClient.isOpen) await redisClient.connect();

    // Check Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by base notes from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Format notes for MongoDB search
    const baseArray = base.split(",").map((note) => note.trim());
    const fragrances = await Fragrance.find({
      "notes.base": { $in: baseArray.map((note) => new RegExp(note, "i")) },
    }).limit(limit);

    console.log("📡 Fetching fragrances from MongoDB");

    // Store results in Redis cache (Expire in 10 minutes)
    if (fragrances.length > 0) {
      await redisClient.setEx(cacheKey, 600, JSON.stringify(fragrances));
    }

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

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by middle notes from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const middleArray = middle.split(",").map((note) => note.trim());
    const fragrances = await Fragrance.find({
      "notes.middle": { $in: middleArray.map((note) => new RegExp(note, "i")) },
    }).limit(limit);

    console.log("📡 Fetching fragrances from MongoDB");
    await redisClient.setEx(cacheKey, 600, JSON.stringify(fragrances));
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

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching fragrances by top notes from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const topArray = top.split(",").map((note) => note.trim());
    const fragrances = await Fragrance.find({
      "notes.top": { $in: topArray.map((note) => new RegExp(note, "i")) },
    }).limit(limit);

    console.log("📡 Fetching fragrances from MongoDB");
    await redisClient.setEx(cacheKey, 600, JSON.stringify(fragrances));
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("❌ Error fetching fragrance by top notes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFragrancesSortedByPrice = async (req, res) => {
  try {
    const { order } = req.query;
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10
    const cacheKey = `fragrances:sorted:price:${order}`;

    if (!["asc", "desc"].includes(order)) {
      return res
        .status(400)
        .json({ message: "Invalid sort order. Use 'asc' or 'desc'." });
    }

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Fetching sorted fragrances from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const fragrances = await Fragrance.find({})
      .sort({ price: order === "asc" ? 1 : -1 })
      .limit(limit);

    console.log("📡 Fetching sorted fragrances from MongoDB");
    await redisClient.setEx(cacheKey, 600, JSON.stringify(fragrances));
    res.status(200).json(fragrances);
  } catch (error) {
    console.error("Error fetching sorted fragrances:", error);
    res.status(500).json({ message: error.message });
  }
};
