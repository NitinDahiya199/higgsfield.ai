# Quick Start Guide

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Python 3.10+
- PostgreSQL 14+
- Redis 6+
- Docker (optional, for local development)

## Step 1: Clone and Setup

```bash
# Create project directory
mkdir higgsfield-saas
cd higgsfield-saas

# Initialize git
git init

# Create basic structure
mkdir -p apps/web apps/api apps/ai-worker packages/shared
```

## Step 2: Frontend Setup (Next.js)

```bash
cd apps/web

# Initialize Next.js
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Install dependencies
npm install framer-motion three @react-three/fiber @react-three/drei
npm install zustand @tanstack/react-query react-hook-form zod
npm install socket.io-client axios date-fns lucide-react

# Install dev dependencies
npm install -D @types/three eslint-config-next
```

## Step 3: Backend Setup (NestJS)

```bash
cd ../api

# Install NestJS CLI
npm i -g @nestjs/cli

# Create new NestJS project
nest new . --skip-git

# Install dependencies
npm install @nestjs/jwt @nestjs/passport @nestjs/websockets @nestjs/platform-socket.io
npm install passport passport-jwt bcrypt class-validator class-transformer
npm install @prisma/client prisma
npm install bullmq ioredis aws-sdk stripe socket.io

# Install dev dependencies
npm install -D @types/passport-jwt @types/bcrypt
```

## Step 4: Database Setup

```bash
cd apps/api

# Initialize Prisma
npx prisma init

# Edit prisma/schema.prisma (see ARCHITECTURE.md for schema)

# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

## Step 5: AI Worker Setup (Python)

```bash
cd ../ai-worker

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn redis boto3 openai stability-sdk requests pillow numpy python-multipart pydantic

# Create basic structure
mkdir -p app/workers app/services app/models app/utils
```

## Step 6: Environment Variables

Create `.env` files in each app:

### apps/web/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### apps/api/.env
```env
DATABASE_URL="postgresql://user:password@localhost:5432/higgsfield"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key-change-this"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRES_IN="7d"
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"
AWS_S3_BUCKET="higgsfield-assets"
STABILITY_API_KEY=""
OPENAI_API_KEY=""
RUNWAY_API_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

### apps/ai-worker/.env
```env
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"
AWS_S3_BUCKET="higgsfield-assets"
STABILITY_API_KEY=""
OPENAI_API_KEY=""
RUNWAY_API_KEY=""
```

## Step 7: Docker Compose (Optional)

Create `docker-compose.yml` in root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: higgsfield
      POSTGRES_PASSWORD: password
      POSTGRES_DB: higgsfield
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

Run with:
```bash
docker-compose up -d
```

## Step 8: Start Development

### Terminal 1: Frontend
```bash
cd apps/web
npm run dev
# Runs on http://localhost:3000
```

### Terminal 2: Backend
```bash
cd apps/api
npm run start:dev
# Runs on http://localhost:3001
```

### Terminal 3: AI Worker
```bash
cd apps/ai-worker
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
# Runs on http://localhost:8000
```

## Step 9: First Steps

1. **Set up authentication**
   - Implement login/signup endpoints
   - Create auth pages in frontend
   - Test JWT flow

2. **Create basic dashboard**
   - Set up protected routes
   - Create dashboard layout
   - Add project list

3. **Build editor skeleton**
   - Set up Three.js canvas
   - Create editor layout
   - Add basic UI components

4. **Implement job system**
   - Create job queue
   - Set up WebSocket
   - Test job creation

## Next Steps

Follow the roadmap in `ROADMAP.md` phase by phase. Start with Phase 0 and work through each phase sequentially.

## Common Issues

### Database Connection
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Run migrations: `npx prisma migrate dev`

### Redis Connection
- Ensure Redis is running
- Check REDIS_URL format
- Test connection: `redis-cli ping`

### CORS Issues
- Configure CORS in backend
- Check NEXT_PUBLIC_API_URL in frontend

### WebSocket Issues
- Ensure WebSocket server is running
- Check WS_URL configuration
- Verify firewall settings

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Three.js Docs](https://threejs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com)

## Getting Help

1. Check the roadmap for detailed phase breakdown
2. Review architecture document for system design
3. Check project structure for file organization
4. Review API documentation (when available)

Good luck! 🚀
