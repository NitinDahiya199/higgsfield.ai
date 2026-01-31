# Troubleshooting Guide

## Common Issues and Solutions

### 1. Next.js Lock File Error

**Error**: `Unable to acquire lock at .next/dev/lock, is another instance of next dev running?`

**Solution**:

```bash
# Option 1: Clean lock files
cd apps/web
rm -rf .next/dev/lock .next/dev/*.lock

# Option 2: Kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /F /PID <PID_NUMBER>

# Option 3: Use the cleanup script
bash scripts/clean-dev.sh
```

### 2. Port Already in Use

**Error**: `Port 3000 is in use by process XXXX`

**Solution**:

```bash
# Find process using port
netstat -ano | findstr :3000

# Kill the process (Windows)
taskkill /F /PID <PID_NUMBER>

# Or use a different port
cd apps/web
PORT=3001 npm run dev
```

### 3. Docker Desktop Not Running

**Error**: `unable to get image... The system cannot find the file specified`

**Solution**:

1. Start Docker Desktop application
2. Wait for Docker to fully initialize (check system tray icon)
3. Verify Docker is running:
   ```bash
   docker ps
   ```
4. Then start services:
   ```bash
   docker-compose up -d
   ```

### 4. Multiple Node Processes Running

**Issue**: Too many Node.js processes consuming resources

**Solution**:

```bash
# Windows - Kill all Node processes (use with caution!)
taskkill /F /IM node.exe

# Or kill specific processes
tasklist | findstr node.exe
taskkill /F /PID <PID_NUMBER>
```

### 5. NestJS Build Errors

**Error**: Webpack/build errors in API

**Solution**:

```bash
cd apps/api
rm -rf dist node_modules
npm install
npm run build
```

### 6. Workspace Dependencies Not Found

**Error**: Module not found errors for workspace packages

**Solution**:

```bash
# Install all workspace dependencies
npm install --workspaces

# Or install in each workspace
cd apps/web && npm install
cd ../api && npm install
cd ../../packages/shared && npm install
```

### 7. TypeScript Errors

**Error**: Type errors across workspaces

**Solution**:

```bash
# Type check all packages
npm run type-check

# Fix in specific package
cd apps/web
npm run type-check
```

### 8. Git Hooks Not Working

**Error**: Husky hooks not executing

**Solution**:

```bash
# Reinstall Husky
npm run prepare

# Or manually
npx husky install
```

## Quick Fixes

### Clean Everything and Restart

```bash
# 1. Stop all processes
bash scripts/clean-dev.sh

# 2. Clean build artifacts
npm run clean

# 3. Reinstall dependencies
rm -rf node_modules apps/*/node_modules packages/*/node_modules
npm install

# 4. Start fresh
npm run dev
```

### Reset Development Environment

```bash
# Clean all
npm run clean
rm -rf apps/web/.next apps/api/dist

# Kill processes on dev ports
# (Use clean-dev.sh script)

# Reinstall
npm install --workspaces

# Start
npm run dev
```

## Port Reference

- **3000**: Next.js Frontend (default)
- **3001**: NestJS Backend API
- **3002**: Next.js Frontend (fallback if 3000 is busy)
- **5432**: PostgreSQL (Docker)
- **6379**: Redis (Docker)
- **8000**: FastAPI AI Worker

## Getting Help

1. Check the error message carefully
2. Review logs in terminal output
3. Check if ports are in use
4. Verify Docker is running (if using Docker services)
5. Ensure all dependencies are installed
6. Try the cleanup script: `bash scripts/clean-dev.sh`

## Useful Commands

```bash
# Check what's using a port
netstat -ano | findstr :3000

# Check running Node processes
tasklist | findstr node.exe

# View Docker containers
docker-compose ps

# View Docker logs
docker-compose logs

# Check workspace status
npm run dev --dry-run

# Type check everything
npm run type-check
```
