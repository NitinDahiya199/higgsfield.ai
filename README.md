# Higgsfield.ai Clone - SaaS Development Project

A complete SaaS platform for AI-powered video generation with text-to-image-to-video pipeline, motion presets, and real-time rendering.

## 📚 Documentation

This project includes comprehensive documentation to guide you from start to finish:

1. **[ROADMAP.md](./documents/ROADMAP.md)** - Complete phase-by-phase development roadmap
2. **[ARCHITECTURE.md](./documents/ARCHITECTURE.md)** - Technical architecture and system design
3. **[PROJECT_STRUCTURE.md](./documents/PROJECT_STRUCTURE.md)** - Project structure and file organization
4. **[QUICK_START.md](./documents/QUICK_START.md)** - Quick start guide for setting up the project
5. **[PRESETS_CONFIG.md](./documents/PRESETS_CONFIG.md)** - Presets system configuration and examples
6. **[IMPLEMENTATION_CHECKLIST.md](./documents/IMPLEMENTATION_CHECKLIST.md)** - Task tracking checklist

## 🎯 Project Overview

This is a full-stack SaaS application that allows users to:

- Generate videos from text prompts using AI
- Apply cinematic motion presets
- Manage projects and assets
- Track usage and billing
- Collaborate with teams

## 🛠️ Technology Stack

### Frontend

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Canvas:** Three.js (WebGL)
- **State:** Zustand
- **Data Fetching:** TanStack Query
- **Forms:** React Hook Form

### Backend

- **API:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Queue:** BullMQ + Redis
- **Storage:** AWS S3 / Cloudflare R2
- **WebSocket:** Socket.io

### AI Workers

- **Framework:** FastAPI (Python)
- **APIs:** Stability AI, Runway, Pika, OpenAI

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose
- Python 3.11+ (for AI workers)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd higgsfield.ai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start Docker services (PostgreSQL and Redis):**

   ```bash
   docker-compose up -d
   ```

5. **Run the development servers:**

   ```bash
   # Start all services
   npm run dev

   # Or start individually:
   # Frontend (Next.js)
   cd apps/web && npm run dev

   # Backend (NestJS)
   cd apps/api && npm run dev

   # AI Worker (FastAPI)
   cd apps/ai-worker && python -m uvicorn main:app --reload
   ```

6. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - AI Worker: http://localhost:8000

## 📁 Project Structure

```
higgsfield.ai/
├── apps/
│   ├── web/          # Next.js frontend
│   ├── api/           # NestJS backend
│   └── ai-worker/     # Python FastAPI workers
├── packages/
│   ├── shared/        # Shared TypeScript types
│   └── ui/            # Shared UI components
├── documents/         # Project documentation
├── docker-compose.yml # Local development services
└── env.example        # Environment variables template
```

See [PROJECT_STRUCTURE.md](./documents/PROJECT_STRUCTURE.md) for detailed structure.

## 📋 Development Scripts

### Root Level

- `npm run dev` - Start all development servers
- `npm run build` - Build all applications
- `npm run lint` - Lint all code
- `npm run type-check` - Type check all TypeScript code
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean all build artifacts

### Frontend (apps/web)

- `npm run dev` - Start Next.js dev server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend (apps/api)

- `npm run dev` - Start NestJS in watch mode
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **Turbo** - Monorepo build system
- **TypeScript** - Type safety

## 📊 Development Timeline

**Estimated Total Time: 5-7 months** (with a small team)

- Phase 0: Foundation (1-2 weeks) ✅
- Phase 1: Core Infrastructure (2-3 weeks)
- Phase 2: Authentication (1-2 weeks)
- Phase 3: Landing Page (1-2 weeks)
- Phase 4: Dashboard (1-2 weeks)
- Phase 5: Editor Core (3-4 weeks)
- Phase 6: AI Pipeline (4-5 weeks)
- Phase 7: Assets Library (2 weeks)
- Phase 8: Billing (2-3 weeks)
- Phase 9: Settings & Teams (2 weeks)
- Phase 10: Polish & Optimization (2-3 weeks)

## 🎯 Key Milestones

1. **MVP** - End of Phase 6
   - Basic editor working
   - AI pipeline functional
   - Users can generate videos

2. **Beta Release** - End of Phase 8
   - All core features complete
   - Billing integrated
   - Ready for limited users

3. **Production Release** - End of Phase 10
   - Fully polished
   - Production-ready
   - Scalable infrastructure

## 🔑 Environment Variables

Copy `env.example` to `.env` and configure:

- Database connection (PostgreSQL)
- Redis connection
- JWT secrets
- Storage (AWS S3 or Cloudflare R2)
- AI API keys (Stability AI, OpenAI, Runway, Pika)
- Stripe keys (for billing)
- Email configuration (optional)

## 🐳 Docker Services

The project includes Docker Compose for local development:

- **PostgreSQL** - Database (port 5432)
- **Redis** - Cache and queue (port 6379)

Start with: `docker-compose up -d`

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run E2E tests (when implemented)
npm run test:e2e
```

## 📝 Code Style

- Use TypeScript for all code
- Follow ESLint rules
- Format with Prettier (runs on pre-commit)
- Write meaningful commit messages

## 🔒 Security

- Never commit `.env` files
- Use environment variables for secrets
- Keep dependencies updated
- Follow security best practices

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [BullMQ Documentation](https://docs.bullmq.io)
- [FastAPI Documentation](https://fastapi.tiangolo.com)

## 🤝 Contributing

1. Follow the roadmap phases sequentially
2. Use the implementation checklist to track progress
3. Write tests for new features
4. Update documentation as needed

## 📝 License

This is a development guide. Use as needed for your project.

## 🚀 Next Steps

1. Review [ROADMAP.md](./documents/ROADMAP.md) for the complete development plan
2. Check [ARCHITECTURE.md](./documents/ARCHITECTURE.md) for system design
3. Follow [IMPLEMENTATION_CHECKLIST.md](./documents/IMPLEMENTATION_CHECKLIST.md) to track progress
4. Start with Phase 1: Core Infrastructure

---

**Good luck building your SaaS! 🚀**
