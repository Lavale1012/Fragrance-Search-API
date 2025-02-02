# Fragrance-Search-API

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing fragrance data.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Redis**: In-memory data structure store for caching.
- **OpenAI**: AI-powered recommendations and chat functionalities.

## Overview

The Fragrance Search API allows users to search for fragrances based on various criteria such as name, brand, gender, concentration, season, and notes. It also provides AI-powered recommendations and chat functionalities.

## Features

- **Search Fragrances**: Search for fragrances by name, brand, gender, concentration, season, and notes. Users can also add a limit to the number of results returned.
- **AI Recommendations**: Get AI-powered fragrance recommendations based on your favorite fragrance.
- **AI-Chat**: Use AI to find fragrances based on user messages.

## Endpoints.

### Fragrance Endpoints

- **Get All Fragrances**
  ```http
  GET /api/fragrances?limit=<number>
  ```
- **Get Fragrance by ID**
  ```http
  GET /api/fragrances/id?id=<fragrance_id>
  ```
- **Get Fragrance by Name**
  ```http
  GET /api/fragrances/name?name=<fragrance_name>&limit=<number>
  ```
- **Get Fragrance by Brand**
  ```http
  GET /api/fragrances/brand?brand=<brand_name>&limit=<number>
  ```
- **Get Fragrance by Gender**
  ```http
  GET /api/fragrances/gender?gender=<gender>&limit=<number>
  ```
- **Get Fragrance by Concentration**
  ```http
  GET /api/fragrances/concentration?concentration=<concentration>&limit=<number>
  ```
- **Get Fragrance by Season**
  ```http
  GET /api/fragrances/season?season=<season>&limit=<number>
  ```
- **Get Fragrance by Notes**
  ```http
  GET /api/fragrances/notes?notes=<notes>&limit=<number>
  ```
- **Get Fragrance by Base Notes**
  ```http
  GET /api/fragrances/notes/base?notes=<base_notes>&limit=<number>
  ```
- **Get Fragrance by Middle Notes**
  ```http
  GET /api/fragrances/notes/middle?notes=<middle_notes>&limit=<number>
  ```
- **Get Fragrance by Top Notes**
  ```http
  GET /api/fragrances/notes/top?notes=<top_notes>&limit=<number>
  ```
- **Get Fragrances Sorted by Price**
  ```http
  GET /api/fragrances/sort/price?order=<asc|desc>&limit=<number>
  ```

### AI Endpoints

- **AI Fragrance Recommendations**
  ```http
  POST /api/ai/fragrance/recommendations
  ```
  ```json
  {
    "favoriteFragrance": "Fragrance Name"
  }
  ```
- **AI Fragrance Chat**
  ```http
  POST /api/ai/fragrance/chat
  ```
  ```json
  {
    "message": "User message for finding fragrances"
  }
  ```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fragrance-api.git
   ```
2. Install dependencies:
   ```bash
   cd fragrance-api
   npm install
   ```
3. Create a `.env` file and add your environment variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   DEFAULT_REDIS_URL=your_redis_url
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Dependencies

- Express
- Mongoose
- Redis
- OpenAI

## License

This project is licensed under the MIT License.
