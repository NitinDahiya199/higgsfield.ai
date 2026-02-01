import { Module, Global } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { RedisService } from "./redis.config";
import { QueueService } from "./queue.config";

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
  ],
  providers: [RedisService, QueueService],
  exports: [RedisService, QueueService, NestConfigModule],
})
export class ConfigModule {}
