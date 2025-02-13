const Redis = require("ioredis");
require("dotenv").config({ path: "../../.env" });

const client = new Redis(process.env.REDIS_URL, {maxRetriesPerRequest: null});

client.on("connect", () => console.log("Connected to Redis Cloud"));
client.on("error", (err) => console.error("Redis Client Error:", err));

module.exports = client;