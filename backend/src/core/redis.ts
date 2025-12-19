import { env } from "@/core/env";
import Redis from "ioredis";

const redis = new Redis(env.REDIS_URL);

redis.on("error", (err) => console.error(`REDIS_ERR: \n ${err}`));

export default redis;
