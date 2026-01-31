import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { Queue, QueueOptions, Worker, WorkerOptions } from "bullmq";
import { RedisService } from "./redis.config";

export interface QueueConfig {
  name: string;
  options?: QueueOptions;
}

export interface WorkerConfig {
  queueName: string;
  processor: (job: any) => Promise<any>;
  options?: WorkerOptions;
}

@Injectable()
export class QueueService implements OnModuleInit {
  private readonly logger = new Logger(QueueService.name);
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    this.logger.log("Queue service initialized");
  }

  createQueue(name: string, options?: QueueOptions): Queue {
    if (this.queues.has(name)) {
      return this.queues.get(name)!;
    }

    const queue = new Queue(name, {
      connection: this.redisService.client as any,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: {
          age: 24 * 3600, // Keep completed jobs for 24 hours
          count: 1000, // Keep max 1000 completed jobs
        },
        removeOnFail: {
          age: 7 * 24 * 3600, // Keep failed jobs for 7 days
        },
      },
      ...options,
    });

    queue.on("error", (error) => {
      this.logger.error(`Queue ${name} error: ${error.message}`);
    });

    this.queues.set(name, queue);
    this.logger.log(`Queue ${name} created`);
    return queue;
  }

  getQueue(name: string): Queue | undefined {
    return this.queues.get(name);
  }

  createWorker(config: WorkerConfig): Worker {
    const { queueName, processor, options } = config;

    if (this.workers.has(queueName)) {
      return this.workers.get(queueName)!;
    }

    const worker = new Worker(
      queueName,
      async (job) => {
        this.logger.log(`Processing job ${job.id} in queue ${queueName}`);
        try {
          const result = await processor(job);
          this.logger.log(`Job ${job.id} completed successfully`);
          return result;
        } catch (error) {
          this.logger.error(`Job ${job.id} failed: ${error.message}`);
          throw error;
        }
      },
      {
        connection: this.redisService.client as any,
        concurrency: 5,
        ...options,
      }
    );

    worker.on("completed", (job) => {
      this.logger.log(`Job ${job.id} completed`);
    });

    worker.on("failed", (job, error) => {
      this.logger.error(`Job ${job?.id} failed: ${error.message}`);
    });

    worker.on("error", (error) => {
      this.logger.error(`Worker ${queueName} error: ${error.message}`);
    });

    this.workers.set(queueName, worker);
    this.logger.log(`Worker for queue ${queueName} created`);
    return worker;
  }

  getWorker(queueName: string): Worker | undefined {
    return this.workers.get(queueName);
  }

  async closeAll() {
    // Close all workers
    for (const [name, worker] of this.workers.entries()) {
      await worker.close();
      this.logger.log(`Worker ${name} closed`);
    }

    // Close all queues
    for (const [name, queue] of this.queues.entries()) {
      await queue.close();
      this.logger.log(`Queue ${name} closed`);
    }
  }
}
