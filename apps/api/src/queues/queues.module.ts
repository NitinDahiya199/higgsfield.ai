import { Module, OnModuleInit } from "@nestjs/common";
import { QueueService } from "../config/queue.config";
import { Logger } from "@nestjs/common";

@Module({
  providers: [QueueService],
  exports: [QueueService],
})
export class QueuesModule implements OnModuleInit {
  private readonly logger = new Logger(QueuesModule.name);

  constructor(private readonly queueService: QueueService) {}

  async onModuleInit() {
    // Create job queues
    this.queueService.createQueue("image-generation");
    this.queueService.createQueue("video-synthesis");
    this.queueService.createQueue("motion-transfer");
    this.queueService.createQueue("post-processing");

    this.logger.log("All job queues initialized");
  }
}
