const Fragrance = require("../models/fragranceModel");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const AIFragranceRecommendations = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    // Send query to OpenAI for NLP processing
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Extract search parameters for fragrances from this query: "${query}". Return a JSON object containing 'notes', 'priceRange', 'gender', 'season', and any other relevant fields.`,
      max_tokens: 150,
    });

    // Parse OpenAI's response
    const params = JSON.parse(response.data.choices[0].text.trim());
    console.log("Extracted Search Parameters:", params);

    // Build a query for MongoDB based on the extracted parameters
    const dbQuery = {};

    if (params.notes) {
      dbQuery.$or = [
        { "notes.top": { $in: params.notes } },
        { "notes.middle": { $in: params.notes } },
        { "notes.base": { $in: params.notes } },
      ];
    }

    if (params.priceRange) {
      dbQuery.price = {
        $gte: params.priceRange.min,
        $lte: params.priceRange.max,
      };
    }

    if (params.gender) {
      dbQuery.gender = new RegExp(params.gender, "i");
    }

    if (params.season) {
      dbQuery.season = new RegExp(params.season, "i");
    }

    // Query the database
    const fragrances = await Fragrance.find(dbQuery);

    if (fragrances.length === 0) {
      return res
        .status(404)
        .json({ message: "No fragrances found matching your query" });
    }

    res.status(200).json(fragrances);
  } catch (error) {
    console.error("Error processing natural search:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { AIFragranceRecommendations };
