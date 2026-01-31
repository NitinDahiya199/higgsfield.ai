export enum JobStatus {
  PENDING = "PENDING",
  QUEUED = "QUEUED",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum StepType {
  IMAGE_GENERATION = "IMAGE_GENERATION",
  VIDEO_SYNTHESIS = "VIDEO_SYNTHESIS",
  MOTION_TRANSFER = "MOTION_TRANSFER",
  POST_PROCESSING = "POST_PROCESSING",
}

export interface Job {
  id: string;
  projectId: string;
  status: JobStatus;
  progress: number;
  currentStep?: string;
  error?: string;
  prompt: string;
  presetId?: string;
  settings?: Record<string, unknown>;
  imageUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface JobStep {
  id: string;
  jobId: string;
  stepType: StepType;
  status: JobStatus;
  progress: number;
  error?: string;
  resultUrl?: string;
  metadata?: Record<string, unknown>;
  startedAt?: Date;
  completedAt?: Date;
}
