# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a full-stack fragrance search API with the following structure:

### Backend (`/server`)
- **Node.js/Express** API server using ES6 modules (`"type": "module"`)
- **MongoDB/Mongoose** for fragrance data persistence
- **Redis** for caching API responses (10-minute TTL)
- **OpenAI** integration for AI-powered recommendations and chat
- **Port**: Default 10000 (configurable via PORT env var)

### Frontend (`/test-client`)
- **React** application for testing the API
- Standard Create React App structure

### Key Components
- **Models**: `fragranceModel.js` defines the MongoDB schema with notes (top/middle/base), price, brand, gender, concentration, season
- **Controllers**: 
  - `fragranceController.js` - All search endpoints with Redis caching
  - `AiFragranceController.js` - OpenAI-powered recommendations and chat
- **Caching**: `redisClientFuntions.js` handles cache operations with 600s default TTL
- **Middleware**: `authApiKey.js` for API authentication

## Commands

### Server Development
```bash
cd server
npm install          # Install dependencies
npm start           # Production server
npm run dev         # Development with nodemon
npm test            # Run Jest tests
```

### Client Development
```bash
cd test-client
npm install          # Install dependencies  
npm start           # Development server (port 3000)
npm run build       # Production build
npm test            # Run React tests
```

## Environment Variables Required

```env
PORT=10000
MONGODB_URI=your_mongodb_uri
DEFAULT_REDIS_URL=your_redis_url  
OPENAI_API_KEY=your_openai_api_key
```

## API Endpoints Structure

The API follows RESTful patterns with extensive query parameter support:
- `/api/fragrances/*` - Main fragrance search endpoints
- `/api/ai/fragrance/*` - AI-powered features (recommendations, chat)

Most endpoints support `limit` query parameter and utilize Redis caching for performance.

## Development Notes

- Server uses ES6 modules - all imports/exports use `.js` extensions
- Redis caching is implemented on most read operations
- OpenAI integration uses GPT-4 for recommendations and parameter extraction
- All fragrance searches support regex matching for flexible queries
- Price sorting and note-based filtering are key features