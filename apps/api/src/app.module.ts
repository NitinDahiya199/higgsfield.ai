import { Module } from "@nestjs/common";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { CommonModule } from "./common/common.module";
import { QueuesModule } from "./queues/queues.module";
import { AuthModule } from "./auth/auth.module";
import { ProjectsModule } from "./projects/projects.module";

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CommonModule,
    QueuesModule,
    AuthModule,
    ProjectsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
