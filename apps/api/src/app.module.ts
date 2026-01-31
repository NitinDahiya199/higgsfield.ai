import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { CommonModule } from "./common/common.module";
import { QueuesModule } from "./queues/queues.module";

@Module({
  imports: [ConfigModule, DatabaseModule, CommonModule, QueuesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
