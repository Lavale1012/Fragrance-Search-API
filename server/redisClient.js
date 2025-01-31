import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || process.env.DEFAULT_REDIS_URL,
});

redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

(async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
})();

export default redisClient;
