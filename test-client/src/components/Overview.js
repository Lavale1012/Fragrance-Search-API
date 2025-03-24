import React from "react";

const Overview = () => {
  return (
    <div>
      <h1>📖 Fragrance Search API</h1>
      <p>
        The Fragrance Search API allows users to search for fragrances based on
        various criteria such as name, brand, gender, concentration, season, and
        notes. It also provides AI-powered recommendations and chat
        functionalities.
      </p>
      <h1>📖 Features</h1>
      <ul>
        <li>
          <strong>Search Fragrances:</strong> Search for fragrances by name,
          brand, gender, concentration, season, and notes. Users can also add a
          limit to the number of results returned.
        </li>
        <li>
          <strong>AI Recommendations:</strong> Get AI-powered fragrance
          recommendations based on your favorite fragrance.
        </li>
        <li>
          <strong>AI-Chat:</strong> Use AI to find fragrances based on user
          messages.
        </li>
      </ul>
      <h1>📖 Technologies Used</h1>
      <ul>
        <li>
          <strong>Node.js:</strong> JavaScript runtime for building server-side
          applications.
        </li>
        <li>
          <strong>Express:</strong> Web framework for Node.js.
        </li>
        <li>
          <strong>MongoDB:</strong> NoSQL database for storing fragrance data.
        </li>
        <li>
          <strong>Mongoose:</strong> ODM for MongoDB and Node.js.
        </li>
        <li>
          <strong>Redis:</strong> In-memory data structure store for caching.
        </li>
        <li>
          <strong>OpenAI:</strong> AI-powered recommendations and chat
          functionalities.
        </li>
      </ul>
    </div>
  );
};

export default Overview;
