import redisClient from "./redisClient.js";

/**
 * Get cached data from Redis
 * @param {string} key - Cache key
 * @returns {Promise<any>} - Cached data or null
 */
export const getCachedData = async (key) => {
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error("❌ Error fetching from cache:", error);
    return null;
  }
};

/**
 * Set data in Redis cache with expiration
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} ttl - Time to live (default: 10 min)
 */
export const setCacheData = async (key, data, ttl = 600) => {
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error("❌ Error setting cache:", error);
  }
};

/**
 * Invalidate cache by deleting specific keys
 * @param {string[]} keys - Array of keys to delete
 */
export const invalidateCache = async (keys) => {
  try {
    if (keys.length) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error("❌ Error invalidating cache:", error);
  }
};
