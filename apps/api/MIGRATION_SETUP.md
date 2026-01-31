# Database Migration Setup

## Current Setup

The project is configured to use **Neon Database** (cloud PostgreSQL).

Connection string format:

```
postgresql://neondb_owner:npg_2KJRXDorfG6w@ep-delicate-firefly-ahn7erde-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Migration Status

✅ Initial migration has been applied successfully.

## Running Migrations

### Create and apply a new migration:

```bash
cd apps/api
npx prisma migrate dev --name your_migration_name
```

### Apply existing migrations (production):

```bash
npx prisma migrate deploy
```

### Generate Prisma Client:

```bash
npx prisma generate
```

## Local Development (Alternative)

If you want to use local PostgreSQL with Docker instead:

1. Update `.env` file:

```bash
DATABASE_URL="postgresql://higgsfield:higgsfield_dev@localhost:5432/higgsfield?schema=public"
```

2. Start PostgreSQL:

```bash
docker-compose up -d postgres
```

## Troubleshooting

### Option 1: Run migrations from inside Docker

```bash
docker exec -it higgsfield-postgres psql -U higgsfield -d higgsfield -f /path/to/migration.sql
```

### Option 2: Use Prisma Studio to verify connection

```bash
npm run prisma:studio
```

### Option 3: Manual migration

1. Generate the migration SQL:

```bash
npx prisma migrate dev --create-only --name init
```

2. Apply it manually:

```bash
docker exec -i higgsfield-postgres psql -U higgsfield -d higgsfield < prisma/migrations/xxxxx_init/migration.sql
```

### Option 4: Use db push (for development)

```bash
npx prisma db push
```

This will sync your schema without creating migration files.

## Verify Connection

Test the database connection:

```bash
docker exec higgsfield-postgres psql -U higgsfield -d higgsfield -c "SELECT 1;"
```

## Troubleshooting

- Ensure PostgreSQL container is running: `docker ps | grep postgres`
- Check logs: `docker logs higgsfield-postgres`
- Verify credentials in `docker-compose.yml` match `.env` file
- Try using `127.0.0.1` instead of `localhost` in DATABASE_URL
- On Windows, you may need to use `host.docker.internal` instead of `localhost`
