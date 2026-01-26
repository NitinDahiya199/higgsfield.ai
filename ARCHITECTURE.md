# Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Next.js)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Landing  │  │  Auth    │  │ Dashboard│  │  Editor  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  WebSocket Client ────────────────────────────────────────┐│
└────────────────────────────────────────────────────────────┼┘
                                                             │
                    HTTPS / WSS                             │
                                                             │
┌────────────────────────────────────────────────────────────┼┐
│                    API Gateway (NestJS)                    ││
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ ││
│  │   Auth   │  │ Projects │  │   Jobs   │  │  Assets  │ ││
│  │  Module  │  │  Module  │  │  Module  │  │  Module  │ ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ ││
│                                                             ││
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 ││
│  │ Billing  │  │ Settings │  │  Teams   │                 ││
│  │  Module  │  │  Module  │  │  Module  │                 ││
│  └──────────┘  └──────────┘  └──────────┘                 ││
│                                                             ││
│  WebSocket Server ────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Job Queue (Redis/BullMQ)
                            │
┌───────────────────────────┴───────────────────────────────┐
│              Orchestration Service                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Pipeline Manager                                      │ │
│  │  - Step 1: Text → Image                               │ │
│  │  - Step 2: Image → Video                               │ │
│  │  - Step 3: Motion Transfer                             │ │
│  │  - Step 4: Post-processing                             │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼──────┐  ┌─────────▼────────┐  ┌──────▼──────┐
│ AI Workers   │  │  AI Workers      │  │ AI Workers │
│ (Python)     │  │  (Python)        │  │ (Python)   │
│              │  │                  │  │            │
│ Image Gen    │  │ Video Synthesis  │  │ Post-proc  │
└───────┬──────┘  └─────────┬────────┘  └──────┬─────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼────────┐
                    │   Storage      │
                    │  (S3 / R2)     │
                    └────────────────┘
```

## Database Schema

### Core Models

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  name          String?
  avatar        String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  projects      Project[]
  organizations OrganizationMember[]
  subscriptions Subscription[]
  usage         Usage[]
  assets        Asset[]
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  members     OrganizationMember[]
  projects    Project[]
  subscription Subscription?
}

model OrganizationMember {
  id             String       @id @default(cuid())
  role           Role         @default(MEMBER)
  userId         String
  organizationId String
  createdAt      DateTime     @default(now())
  
  user           User         @relation(fields: [userId], references: [id])
  organization   Organization @relation(fields: [organizationId], references: [id])
  
  @@unique([userId, organizationId])
}

enum Role {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

model Project {
  id          String   @id @default(cuid())
  name        String
  thumbnail   String?
  userId      String
  organizationId String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id])
  organization Organization? @relation(fields: [organizationId], references: [id])
  jobs        Job[]
  assets      Asset[]
}

model Job {
  id          String   @id @default(cuid())
  projectId   String
  status      JobStatus @default(PENDING)
  progress    Int      @default(0)
  currentStep String?
  error       String?
  
  // Job configuration
  prompt      String
  presetId    String?
  settings    Json?    // Additional settings
  
  // Results
  imageUrl    String?
  videoUrl    String?
  thumbnailUrl String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  completedAt DateTime?
  
  project     Project  @relation(fields: [projectId], references: [id])
  preset      Preset?  @relation(fields: [presetId], references: [id])
  steps       JobStep[]
  
  @@index([projectId])
  @@index([status])
}

enum JobStatus {
  PENDING
  QUEUED
  RUNNING
  COMPLETED
  FAILED
  CANCELLED
}

model JobStep {
  id          String   @id @default(cuid())
  jobId       String
  stepType    StepType
  status      JobStatus @default(PENDING)
  progress    Int      @default(0)
  error       String?
  resultUrl   String?
  metadata    Json?
  
  startedAt   DateTime?
  completedAt DateTime?
  
  job         Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)
  
  @@index([jobId])
}

enum StepType {
  IMAGE_GENERATION
  VIDEO_SYNTHESIS
  MOTION_TRANSFER
  POST_PROCESSING
}

model Preset {
  id          String   @id @default(cuid())
  name        String
  description String?
  category    String
  thumbnail   String?
  
  // Preset configuration
  config      Json     // Camera, motion, duration, etc.
  
  isDefault   Boolean  @default(false)
  isPublic    Boolean  @default(true)
  userId      String?  // null for default presets
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User?    @relation(fields: [userId], references: [id])
  jobs        Job[]
  
  @@index([category])
  @@index([isPublic])
}

model Asset {
  id          String   @id @default(cuid())
  name        String
  type        AssetType
  url         String
  thumbnailUrl String?
  size        Int      // bytes
  width       Int?
  height      Int?
  duration    Int?     // seconds for video
  
  userId      String
  projectId   String?
  
  createdAt   DateTime @default(now())
  
  user        User     @relation(fields: [userId], references: [id])
  project     Project? @relation(fields: [projectId], references: [id])
  
  @@index([userId])
  @@index([projectId])
}

enum AssetType {
  IMAGE
  VIDEO
  AUDIO
  OTHER
}

model Subscription {
  id              String   @id @default(cuid())
  userId          String
  organizationId  String?
  
  stripeCustomerId String  @unique
  stripeSubscriptionId String? @unique
  stripePriceId   String?
  
  status          SubscriptionStatus
  plan            PlanType
  
  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  cancelAtPeriodEnd  Boolean @default(false)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  user            User     @relation(fields: [userId], references: [id])
  organization    Organization? @relation(fields: [organizationId], references: [id])
  
  @@index([userId])
  @@index([stripeCustomerId])
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
  PAST_DUE
  UNPAID
  TRIALING
}

enum PlanType {
  FREE
  PRO
  ENTERPRISE
}

model Usage {
  id          String   @id @default(cuid())
  userId      String
  date        DateTime @db.Date
  
  jobsCreated Int      @default(0)
  creditsUsed Int      @default(0)
  storageUsed Int      @default(0) // bytes
  
  user        User     @relation(fields: [userId], references: [id])
  
  @@unique([userId, date])
  @@index([userId, date])
}
```

## API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/verify-email
POST   /api/auth/reset-password
POST   /api/auth/forgot-password
GET    /api/auth/me
```

### Projects
```
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

### Jobs
```
GET    /api/jobs
POST   /api/jobs
GET    /api/jobs/:id
DELETE /api/jobs/:id
POST   /api/jobs/:id/cancel
```

### Assets
```
GET    /api/assets
POST   /api/assets
GET    /api/assets/:id
DELETE /api/assets/:id
POST   /api/assets/upload
```

### Presets
```
GET    /api/presets
GET    /api/presets/:id
POST   /api/presets (admin only)
PATCH  /api/presets/:id (admin only)
```

### Billing
```
GET    /api/billing/subscription
POST   /api/billing/checkout
POST   /api/billing/portal
GET    /api/billing/usage
```

### Settings
```
GET    /api/settings
PATCH  /api/settings
```

### Teams
```
GET    /api/teams/:id/members
POST   /api/teams/:id/members/invite
PATCH  /api/teams/:id/members/:memberId
DELETE /api/teams/:id/members/:memberId
```

## WebSocket Events

### Client → Server
```typescript
{
  "type": "subscribe",
  "channel": "job:${jobId}"
}

{
  "type": "unsubscribe",
  "channel": "job:${jobId}"
}
```

### Server → Client
```typescript
{
  "type": "job.progress",
  "jobId": "xxx",
  "progress": 45,
  "currentStep": "VIDEO_SYNTHESIS",
  "status": "RUNNING"
}

{
  "type": "job.completed",
  "jobId": "xxx",
  "videoUrl": "https://...",
  "thumbnailUrl": "https://..."
}

{
  "type": "job.failed",
  "jobId": "xxx",
  "error": "Error message"
}

{
  "type": "step.completed",
  "jobId": "xxx",
  "stepId": "xxx",
  "stepType": "IMAGE_GENERATION",
  "resultUrl": "https://..."
}
```

## Job Queue Structure

### Queue Names
- `image-generation`
- `video-synthesis`
- `motion-transfer`
- `post-processing`

### Job Data Structure
```typescript
interface ImageGenerationJob {
  jobId: string;
  prompt: string;
  style?: string;
  aspectRatio: string;
  userId: string;
}

interface VideoSynthesisJob {
  jobId: string;
  imageUrl: string;
  presetId: string;
  duration: number;
  userId: string;
}

interface MotionTransferJob {
  jobId: string;
  videoUrl: string;
  presetId: string;
  userId: string;
}

interface PostProcessingJob {
  jobId: string;
  videoUrl: string;
  operations: string[];
  userId: string;
}
```

## AI Pipeline Flow

```
1. User clicks "Generate"
   ↓
2. Create Job (status: PENDING)
   ↓
3. Add to image-generation queue
   ↓
4. Worker picks up job
   - Call SDXL/DALL·E API
   - Download image
   - Upload to S3
   - Update JobStep (IMAGE_GENERATION)
   ↓
5. Add to video-synthesis queue
   ↓
6. Worker picks up job
   - Call Runway/Pika API
   - Download video
   - Upload to S3
   - Update JobStep (VIDEO_SYNTHESIS)
   ↓
7. Add to motion-transfer queue (if preset requires)
   ↓
8. Worker picks up job
   - Apply motion preset
   - Process video
   - Upload to S3
   - Update JobStep (MOTION_TRANSFER)
   ↓
9. Add to post-processing queue
   ↓
10. Worker picks up job
    - Upscale (if needed)
    - Apply effects
    - Final export
    - Upload to S3
    - Update JobStep (POST_PROCESSING)
    ↓
11. Update Job (status: COMPLETED)
    ↓
12. Emit WebSocket event
    ↓
13. Frontend updates UI
```

## Security Considerations

1. **Authentication**
   - JWT tokens with refresh tokens
   - Token expiration (15 min access, 7 days refresh)
   - Secure cookie storage

2. **Authorization**
   - Role-based access control (RBAC)
   - Resource ownership checks
   - API rate limiting

3. **Data Protection**
   - Encrypt sensitive data
   - Use HTTPS/WSS everywhere
   - Sanitize user inputs
   - SQL injection prevention (Prisma)

4. **API Keys**
   - Store in environment variables
   - Never expose in frontend
   - Rotate regularly

5. **Storage**
   - Signed URLs for S3 access
   - Time-limited URLs
   - Private buckets by default

## Performance Optimizations

1. **Frontend**
   - Code splitting
   - Image optimization
   - Lazy loading
   - Memoization

2. **Backend**
   - Database indexing
   - Query optimization
   - Caching (Redis)
   - Connection pooling

3. **Queue**
   - Priority queues
   - Job batching
   - Worker scaling

4. **Storage**
   - CDN for static assets
   - Image compression
   - Video transcoding

## Monitoring & Observability

1. **Application Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Uptime monitoring

2. **Infrastructure Monitoring**
   - Server metrics
   - Database performance
   - Queue depth
   - Storage usage

3. **Business Metrics**
   - User signups
   - Jobs created
   - Revenue
   - Usage patterns
