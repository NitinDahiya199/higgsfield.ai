# Project Structure

## Recommended Monorepo Structure

```
higgsfield-saas/
├── apps/
│   ├── web/                    # Next.js Frontend
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   ├── signup/
│   │   │   │   └── verify-email/
│   │   │   ├── (marketing)/
│   │   │   │   └── page.tsx    # Landing page
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── editor/
│   │   │   │   │   └── [projectId]/
│   │   │   │   ├── assets/
│   │   │   │   ├── billing/
│   │   │   │   └── settings/
│   │   │   ├── api/             # Next.js API routes (optional)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── ui/              # Base UI components
│   │   │   ├── editor/          # Editor-specific components
│   │   │   ├── dashboard/       # Dashboard components
│   │   │   └── shared/          # Shared components
│   │   ├── lib/
│   │   │   ├── api/             # API client
│   │   │   ├── hooks/           # Custom hooks
│   │   │   ├── utils/           # Utility functions
│   │   │   └── stores/          # Zustand stores
│   │   ├── public/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── api/                     # NestJS/Fastify Backend
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── strategies/
│   │   │   │   └── guards/
│   │   │   ├── projects/
│   │   │   ├── jobs/
│   │   │   ├── assets/
│   │   │   ├── presets/
│   │   │   ├── billing/
│   │   │   ├── settings/
│   │   │   ├── teams/
│   │   │   ├── common/
│   │   │   │   ├── decorators/
│   │   │   │   ├── filters/
│   │   │   │   ├── guards/
│   │   │   │   ├── interceptors/
│   │   │   │   └── pipes/
│   │   │   ├── config/
│   │   │   ├── database/
│   │   │   ├── queue/
│   │   │   ├── storage/
│   │   │   ├── websocket/
│   │   │   └── main.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── test/
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── ai-worker/               # Python FastAPI Workers
│       ├── app/
│       │   ├── workers/
│       │   │   ├── image_generator.py
│       │   │   ├── video_synthesizer.py
│       │   │   ├── motion_transfer.py
│       │   │   └── post_processor.py
│       │   ├── services/
│       │   │   ├── s3_service.py
│       │   │   ├── redis_service.py
│       │   │   └── api_clients.py
│       │   ├── models/
│       │   ├── utils/
│       │   └── main.py
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/
│   ├── shared/                  # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── job.ts
│   │   │   │   ├── project.ts
│   │   │   │   ├── asset.ts
│   │   │   │   └── preset.ts
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── ui/                      # Shared UI components (optional)
│       ├── src/
│       ├── tsconfig.json
│       └── package.json
│
├── docker/
│   ├── docker-compose.yml
│   ├── Dockerfile.api
│   └── Dockerfile.ai-worker
│
├── scripts/
│   ├── setup.sh
│   ├── seed.ts
│   └── deploy.sh
│
├── docs/
│   ├── api/
│   └── guides/
│
├── .env.example
├── .gitignore
├── package.json                 # Root package.json (if using workspaces)
├── turbo.json                   # Turborepo config (optional)
└── README.md
```

## Frontend Structure (apps/web)

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   └── layout.tsx
│
├── (marketing)/
│   ├── page.tsx                 # Landing page
│   ├── pricing/
│   │   └── page.tsx
│   └── layout.tsx
│
├── (dashboard)/
│   ├── dashboard/
│   │   └── page.tsx             # Projects list
│   ├── editor/
│   │   └── [projectId]/
│   │       └── page.tsx         # Editor page
│   ├── assets/
│   │   └── page.tsx             # Media library
│   ├── billing/
│   │   ├── page.tsx             # Billing dashboard
│   │   └── usage/
│   │       └── page.tsx
│   ├── settings/
│   │   ├── page.tsx             # Settings
│   │   └── team/
│   │       └── page.tsx
│   └── layout.tsx                # Dashboard layout
│
└── api/                          # Next.js API routes (if needed)
```

## Component Structure

```
components/
├── ui/                          # Base components (shadcn/ui style)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   └── ...
│
├── editor/
│   ├── Canvas.tsx               # WebGL canvas
│   ├── PromptPanel.tsx          # Right sidebar
│   ├── PresetsSidebar.tsx       # Left sidebar
│   ├── Timeline.tsx             # Bottom timeline
│   ├── StepIndicator.tsx
│   └── GenerateButton.tsx
│
├── dashboard/
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   ├── UsageWidget.tsx
│   └── RecentProjects.tsx
│
├── assets/
│   ├── AssetGrid.tsx
│   ├── AssetCard.tsx
│   ├── UploadZone.tsx
│   └── AssetPreview.tsx
│
└── shared/
    ├── Header.tsx
    ├── Sidebar.tsx
    ├── LoadingSpinner.tsx
    └── ErrorBoundary.tsx
```

## Store Structure (Zustand)

```
lib/stores/
├── editorStore.ts
│   ├── canvas state
│   ├── camera controls
│   └── scene objects
│
├── projectStore.ts
│   ├── current project
│   └── project list
│
├── jobStore.ts
│   ├── active jobs
│   ├── job progress
│   └── job history
│
├── presetStore.ts
│   ├── presets list
│   ├── favorites
│   └── selected preset
│
└── authStore.ts
    ├── user data
    └── auth state
```

## Backend Structure (apps/api)

```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   └── guards/
│       └── jwt-auth.guard.ts
│
├── projects/
│   ├── projects.controller.ts
│   ├── projects.service.ts
│   ├── projects.module.ts
│   └── dto/
│
├── jobs/
│   ├── jobs.controller.ts
│   ├── jobs.service.ts
│   ├── jobs.module.ts
│   ├── queue/
│   │   └── job.processor.ts
│   └── dto/
│
├── queue/
│   ├── queue.module.ts
│   ├── queue.service.ts
│   └── processors/
│
├── websocket/
│   ├── websocket.gateway.ts
│   └── websocket.module.ts
│
└── common/
    ├── decorators/
    │   ├── current-user.decorator.ts
    │   └── roles.decorator.ts
    ├── filters/
    │   └── http-exception.filter.ts
    ├── guards/
    │   └── roles.guard.ts
    └── pipes/
        └── validation.pipe.ts
```

## Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/higgsfield"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRES_IN="7d"

# Storage
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"
AWS_S3_BUCKET="higgsfield-assets"
# OR Cloudflare R2
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME=""

# AI APIs
STABILITY_API_KEY=""
OPENAI_API_KEY=""
RUNWAY_API_KEY=""
PIKA_API_KEY=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_PUBLISHABLE_KEY=""

# App
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_WS_URL="ws://localhost:3001"
NODE_ENV="development"

# Email (optional)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASSWORD=""
```

## Package.json Dependencies

### Frontend (apps/web)
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^10.16.0",
    "three": "^0.158.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.0.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "socket.io-client": "^4.5.0",
    "axios": "^1.6.0",
    "date-fns": "^2.30.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/three": "^0.158.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### Backend (apps/api)
```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/websockets": "^10.0.0",
    "@nestjs/platform-socket.io": "^10.0.0",
    "@prisma/client": "^5.0.0",
    "prisma": "^5.0.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.0",
    "bcrypt": "^5.1.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.0",
    "bullmq": "^5.0.0",
    "ioredis": "^5.3.0",
    "aws-sdk": "^2.1500.0",
    "stripe": "^14.0.0",
    "socket.io": "^4.5.0",
    "reflect-metadata": "^0.1.0",
    "rxjs": "^7.8.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/bcrypt": "^5.0.0",
    "@types/passport-jwt": "^3.0.0",
    "typescript": "^5.0.0",
    "ts-node": "^10.9.0"
  }
}
```

### AI Worker (apps/ai-worker)
```python
# requirements.txt
fastapi==0.104.0
uvicorn==0.24.0
redis==5.0.0
boto3==1.29.0
openai==1.3.0
stability-sdk==0.8.0
requests==2.31.0
pillow==10.1.0
numpy==1.26.0
python-multipart==0.0.6
pydantic==2.5.0
```
