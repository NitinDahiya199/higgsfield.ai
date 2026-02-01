import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { CommonModule } from "./common/common.module";
import { QueuesModule } from "./queues/queues.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [ConfigModule, DatabaseModule, CommonModule, QueuesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
