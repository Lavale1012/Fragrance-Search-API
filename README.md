# 🌸 Fragrance Search API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

_A powerful AI-enhanced fragrance discovery platform with intelligent search and personalized recommendations_

</div>

## ✨ Overview

The Fragrance Search API is a comprehensive platform that revolutionizes how users discover and explore fragrances. Built with modern technologies and enhanced with AI capabilities, it offers intelligent search, personalized recommendations, and natural language interactions for fragrance enthusiasts.

## 🚀 Key Features

### 🔍 **Advanced Search Engine**

- Multi-criteria search (name, brand, gender, concentration, season, notes)
- Intelligent note-based filtering (top, middle, base notes)
- Price range sorting and filtering
- Redis-powered caching for lightning-fast responses

### 🤖 **AI-Powered Intelligence**

- **Smart Recommendations**: Get personalized suggestions based on your favorite fragrances
- **Natural Language Chat**: Describe what you're looking for in plain English
- **Intelligent Parameter Extraction**: AI understands your preferences automatically

### ⚡ **Performance & Scalability**

- Redis caching with 10-minute TTL for optimal performance
- MongoDB with optimized queries and indexing
- Request timeout handling and error recovery
- Comprehensive input validation

## 🛠️ Tech Stack

| Technology   | Purpose             | Version    |
| ------------ | ------------------- | ---------- |
| **Node.js**  | Runtime Environment | Latest LTS |
| **Express**  | Web Framework       | ^4.21.2    |
| **MongoDB**  | Database            | ^6.12.0    |
| **Mongoose** | ODM                 | ^8.9.2     |
| **Redis**    | Caching Layer       | ^5.8.2     |
| **OpenAI**   | AI Integration      | ^4.78.1    |
| **Jest**     | Testing Framework   | ^30.1.1    |

## 📚 API Endpoints

### 🔍 **Fragrance Search Endpoints**

<details>
<summary><strong>Core Search Operations</strong></summary>

#### Get All Fragrances

```http
GET /api/fragrances?limit=20
```

_Retrieve all fragrances with optional pagination_

#### Get Fragrance by ID

```http
GET /api/fragrances/id?id=507f1f77bcf86cd799439011
```

_Find a specific fragrance by MongoDB ObjectId_

#### Search by Name

```http
GET /api/fragrances/name?name=Bleu%20de%20Chanel&limit=10
```

_Search fragrances by name with fuzzy matching_

#### Search by Brand

```http
GET /api/fragrances/brand?brand=Chanel&limit=15
```

_Find all fragrances from a specific brand_

</details>

<details>
<summary><strong>Advanced Filtering</strong></summary>

#### Filter by Gender

```http
GET /api/fragrances/gender?gender=male&limit=20
```

_Options: `male`, `female`, `unisex`_

#### Filter by Concentration

```http
GET /api/fragrances/concentration?concentration=eau%20de%20parfum&limit=10
```

_Options: `eau de toilette`, `eau de parfum`, `parfum`, `cologne`_

#### Filter by Season

```http
GET /api/fragrances/season?season=summer&limit=15
```

_Options: `spring`, `summer`, `autumn`, `winter`_

#### Sort by Price

```http
GET /api/fragrances/sort/price?order=asc&limit=25
```

_Options: `asc` (low to high), `desc` (high to low)_

</details>

<details>
<summary><strong>Note-Based Search</strong></summary>

#### Search All Notes

```http
GET /api/fragrances/notes?notes=vanilla,bergamot&limit=10
```

_Search across all note layers_

#### Search by Top Notes

```http
GET /api/fragrances/notes/top?notes=citrus,bergamot&limit=10
```

#### Search by Middle Notes

```http
GET /api/fragrances/notes/middle?notes=rose,jasmine&limit=10
```

#### Search by Base Notes

```http
GET /api/fragrances/notes/base?notes=sandalwood,musk&limit=10
```

</details>

### 🤖 **AI-Powered Endpoints**

<details>
<summary><strong>Intelligent Recommendations</strong></summary>

#### AI Fragrance Recommendations

```http
POST /api/ai/fragrance/recommendations
Content-Type: application/json

{
  "favoriteFragrance": "Bleu de Chanel"
}
```

**Response:**

```json
{
  "message": "Recommended fragrances",
  "recommendations": "1. Dior Sauvage - Fresh and spicy with bergamot and pepper notes..."
}
```

</details>

<details>
<summary><strong>Natural Language Search</strong></summary>

#### AI Chat Interface

```http
POST /api/ai/fragrance/chat
Content-Type: application/json

{
  "message": "I want something fresh and citrusy for summer under $100"
}
```

**Response:**

```json
[
  {
    "_id": "...",
    "name": "Acqua di Gio",
    "brand": "Giorgio Armani",
    "price": 85,
    "notes": {
      "top": ["bergamot", "lemon", "lime"],
      "middle": ["jasmine", "rose"],
      "base": ["white musk", "cedar"]
    }
  }
]
```

</details>

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance
- Redis server
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fragrance-api.git
   cd fragrance-api
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server && npm install

   # Install client dependencies (optional)
   cd ../test-client && npm install
   ```

3. **Environment Setup**

   Create `server/.env` with your configuration:

   ```env
   # Server Configuration
   PORT=10000
   ALTER_PORT=3003

   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fragrance-db

   # Cache
   DEFAULT_REDIS_URL=redis://localhost:6379

   # AI Integration
   OPENAI_API_KEY=sk-proj-your-openai-key-here

   # Deployment (optional)
   HOST_URL=https://your-deployed-url.com
   ```

4. **Start the services**

   **Development mode:**

   ```bash
   cd server
   npm run dev    # Server with nodemon
   ```

   **Production mode:**

   ```bash
   cd server
   npm start      # Production server
   ```

5. **Test the API**
   ```bash
   # Quick health check
   curl http://localhost:10000/api/fragrances?limit=5
   ```

## 🧪 Testing

Run the comprehensive test suite:

```bash
cd server
npm test                    # Run all tests
npm test -- --coverage     # Run with coverage report
npm test -- --watch        # Watch mode for development
```

## 📁 Project Structure

```
fragrance-api/
├── server/                 # Backend API
│   ├── controllers/        # Request handlers
│   │   ├── fragranceController.js
│   │   └── AiFragranceController.js
│   ├── models/            # Database schemas
│   │   └── fragranceModel.js
│   ├── routes/            # API route definitions
│   ├── lib/               # Utilities & Redis client
│   ├── middleware/        # Authentication & validation
│   └── index.js           # Server entry point
├── test-client/           # React testing interface
│   ├── src/
│   └── public/
└── README.md
```

## 🔧 Configuration

### Redis Caching

- **TTL**: 600 seconds (10 minutes)
- **Auto-cleanup**: Expired keys removed automatically
- **Fallback**: Graceful degradation if Redis unavailable

### MongoDB Schema

```javascript
{
  name: String,
  brand: String,
  gender: String,           // male, female, unisex
  concentration: String,    // eau de toilette, eau de parfum, etc.
  season: String,          // spring, summer, autumn, winter
  price: Number,
  notes: {
    top: [String],
    middle: [String],
    base: [String]
  }
}
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://...
DEFAULT_REDIS_URL=redis://...
OPENAI_API_KEY=sk-proj-...
HOST_URL=https://your-domain.com
```

### Docker Support (Coming Soon)

```bash
# Build and run with Docker
docker build -t fragrance-api .
docker run -p 10000:10000 --env-file .env fragrance-api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for powerful AI capabilities
- **MongoDB** for flexible document storage
- **Redis** for high-performance caching
- **Express.js** community for excellent middleware

---

<div align="center">
  
**Made with ❤️ by [Lavale Butterfield](https://github.com/yourusername)**

_Happy fragrance hunting! 🌸_

</div>
