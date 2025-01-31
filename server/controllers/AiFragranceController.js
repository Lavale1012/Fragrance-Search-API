import OpenAI from "openai";
import dotenv from "dotenv";
import Fragrance from "../models/fragranceModel.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const AIFragranceRecommendations = async (req, res) => {
  try {
    const { favoriteFragrance } = req.body;

    if (!favoriteFragrance) {
      return res.status(400).json({
        message: "Favorite fragrance is required for recommendations.",
      });
    }

    console.log("Received favorite fragrance:", favoriteFragrance);

    // Use OpenAI to analyze fragrance profiles
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Given the fragrance "${favoriteFragrance}", recommend 5 similar fragrances based on scent profiles and notes.`,
        },
      ],
    });

    // Parse AI response
    const recommendations = completion.choices[0].message.content.trim();
    console.log("AI Recommendations:", recommendations);

    res.status(200).json({
      message: "Recommended fragrances",
      recommendations,
    });
  } catch (error) {
    console.error("Error in AI recommendations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const AIFragranceChat = async (req, res) => {
  const filterByNotes = (query, notes) => {
    const notesArray = Array.isArray(notes) ? notes : [notes];

    query.$or = [
      { "notes.top": { $in: notesArray.map((note) => new RegExp(note, "i")) } },
      {
        "notes.middle": {
          $in: notesArray.map((note) => new RegExp(note, "i")),
        },
      },
      {
        "notes.base": { $in: notesArray.map((note) => new RegExp(note, "i")) },
      },
    ];

    return query;
  };
  const filterByGender = (query, gender) => {
    query.gender = new RegExp(`^${gender}$`, "i");
    return query;
  };
  const filterByPrice = (query, priceRange) => {
    let minPrice = 0;
    let maxPrice = Infinity;

    if (typeof priceRange === "string") {
      if (priceRange.toLowerCase().includes("under")) {
        maxPrice = parseInt(priceRange.replace(/[^0-9]/g, ""), 10);
      } else if (priceRange.toLowerCase().includes("over")) {
        minPrice = parseInt(priceRange.replace(/[^0-9]/g, ""), 10);
      } else if (priceRange.toLowerCase().includes("between")) {
        const [min, max] = priceRange.match(/\d+/g).map(Number);
        minPrice = min;
        maxPrice = max;
      }
    }

    query.price = { $gte: minPrice, $lte: maxPrice };
    return query;
  };
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required." });
    }

    console.log("User message:", message);

    // Call OpenAI to extract search parameters
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Help the user find fragrances based on this message: "${message}". Extract search parameters (notes, gender, price range, and season) and return them as a JSON object.`,
        },
      ],
    });

    const params = JSON.parse(completion.choices[0].message.content.trim());
    console.log("Extracted Search Parameters:", params);

    const query = {};

    // Handle price range
    if (params.priceRange) {
      const { min = 0, max = Infinity } = params.priceRange;
      query.price = { $gte: min, $lte: max };
      console.log("Price range for query:", query.price);
    }

    // Handle gender
    if (params.gender) {
      query.gender = new RegExp(`^${params.gender}$`, "i");
      console.log("Gender for query:", query.gender);
    }

    // Handle notes
    if (params.notes) {
      const notesArray = Array.isArray(params.notes)
        ? params.notes
        : [params.notes];
      query.$or = [
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
      ];
      console.log("Notes for query:", query.$or);
    }

    // Handle season
    if (params.season) {
      query.season = new RegExp(`^${params.season}$`, "i");
      console.log("Season for query:", query.season);
    }

    // Log the final query
    console.log("Constructed MongoDB query:", query);

    // Query the database
    const fragrances = await Fragrance.find(query);
    console.log("Matching fragrances from DB:", fragrances);

    if (fragrances.length === 0) {
      return res
        .status(404)
        .json({ message: "No fragrances found matching your query." });
    }

    res.status(200).json(fragrances);
  } catch (error) {
    console.error("Error in AI chat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
