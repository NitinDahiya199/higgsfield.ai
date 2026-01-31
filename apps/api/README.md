# API Server

NestJS backend API for Higgsfield.ai

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp ../../env.example .env
# Edit .env with your configuration
```

3. Start Redis (via Docker Compose):

```bash
docker-compose up -d redis
```

4. Database Setup:
   - The project is configured to use **Neon Database** (cloud PostgreSQL)
   - The connection string is set in `.env` file
   - Initial migrations have been applied

   To run new migrations:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

   For local PostgreSQL (alternative), see `MIGRATION_SETUP.md`

5. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Type check without emitting files
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and apply migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed database (if seed file exists)

## Project Structure

```
src/
├── common/          # Shared utilities, filters, interceptors, pipes
├── config/          # Configuration modules (Redis, Queue)
├── database/        # Database module and Prisma service
├── queues/          # Queue module and queue initialization
└── app.module.ts    # Root application module
```

## Environment Variables

See `env.example` for required environment variables.

## Database

The project uses PostgreSQL with Prisma ORM. The schema is defined in `prisma/schema.prisma`.

## Job Queues

The application uses BullMQ with Redis for job processing. The following queues are configured:

- `image-generation` - Image generation jobs
- `video-synthesis` - Video synthesis jobs
- `motion-transfer` - Motion transfer jobs
- `post-processing` - Post-processing jobs
