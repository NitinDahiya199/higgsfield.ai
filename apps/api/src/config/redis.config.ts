import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  public client: Redis;

  constructor() {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

    this.client = new Redis(redisUrl, {
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      maxRetriesPerRequest: 3,
    });

    this.client.on("error", (error) => {
      this.logger.error(`Redis connection error: ${error.message}`);
    });

    this.client.on("connect", () => {
      this.logger.log("Redis connected successfully");
    });

    this.client.on("ready", () => {
      this.logger.log("Redis is ready");
    });
  }

  async onModuleInit() {
    try {
      await this.client.ping();
      this.logger.log("Redis service initialized");
    } catch (error) {
      this.logger.error(`Failed to initialize Redis: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
    this.logger.log("Redis connection closed");
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setex(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }
}
