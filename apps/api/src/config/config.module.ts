import { Module, Global } from "@nestjs/common";
import { RedisService } from "./redis.config";
import { QueueService } from "./queue.config";

@Global()
@Module({
  providers: [RedisService, QueueService],
  exports: [RedisService, QueueService],
})
export class ConfigModule {}
