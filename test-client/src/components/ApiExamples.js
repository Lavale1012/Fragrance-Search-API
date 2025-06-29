import React from "react";
import { useState } from "react";
import axios from "axios";
const API_BASE_URL = "https://fragrance-search-api.onrender.com/api/fragrances";
const ApiExamples = () => {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState("");

  const runExample = async (endpoint) => {
    setApiUrl(`${API_BASE_URL}${endpoint}`);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      setFragrances(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>🎯 Try API Examples</h2>
      <p>Click a button below to run an example API request:</p>
      <div className="example-buttons">
        <button onClick={() => runExample("?limit=15")}>
          🔍 Get All Fragrances
        </button>
        <button onClick={() => runExample("/name?name=Chanel")}>
          🔍 Search by Name (Chanel)
        </button>
        <button onClick={() => runExample("/brand?brand=Dior")}>
          🔍 Search by Brand (Dior)
        </button>
        <button onClick={() => runExample("/gender?gender=unisex")}>
          🔍 Search by Gender (Unisex)
        </button>
        <button onClick={() => runExample("/season?season=spring")}>
          🔍 Search by Season (Spring)
        </button>
        <button onClick={() => runExample("/notes?notes=vanilla,peach,rose")}>
          🔍 Search by Notes
        </button>
        <button onClick={() => runExample("/notes/base?base=vanilla")}>
          🔍 Search by Base Notes (Vanilla)
        </button>
        <button onClick={() => runExample("/concentration?concentration=EDP")}>
          🔍 Search by Concentration (EDP)
        </button>
        <button onClick={() => runExample("/sort/price?order=asc")}>
          🔍 Sort by Price (Low to High)
        </button>
        <button onClick={() => runExample("/sort/price?order=desc")}>
          🔍 Sort by Price (High to Low)
        </button>
      </div>
      <h2>📡 API Request</h2>
      <pre>{apiUrl || "Click an example to generate an API request URL."}</pre>
      <h2>📌 API Response</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="fragrance-grid">
        {fragrances.length > 0 &&
          fragrances.map((fragrance) => (
            <div className="fragrance-card" key={fragrance._id}>
              <img
                src={
                  fragrance.imagesUrl?.image1 ||
                  "https://via.placeholder.com/150"
                }
                alt={fragrance.name}
                className="fragrance-image"
              />
              <h3>{fragrance.name}</h3>
              <p>
                <strong>Brand:</strong> {fragrance.brand}
              </p>
              <p>
                <strong>Price:</strong> ${fragrance.price}
              </p>
              <p>
                <strong>Gender:</strong> {fragrance.gender}
              </p>
              <p>
                <strong>Notes:</strong>
                <br />
                <strong>Top:</strong>{" "}
                {fragrance.notes?.top?.join(", ") || "N/A"}
                <br />
                <strong>Middle:</strong>{" "}
                {fragrance.notes?.middle?.join(", ") || "N/A"}
                <br />
                <strong>Base:</strong>{" "}
                {fragrance.notes?.base?.join(", ") || "N/A"}
              </p>

              <a
                href={fragrance.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                🛒 Buy Now
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApiExamples;
