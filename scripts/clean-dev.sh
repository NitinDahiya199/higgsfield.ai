#!/bin/bash

# Clean development environment script

echo "🧹 Cleaning development environment..."

# Kill processes on common dev ports
echo "Stopping processes on ports 3000, 3001, 8000..."

# Windows (Git Bash)
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  # Port 3000
  for pid in $(netstat -ano | findstr :3000 | awk '{print $5}' | sort -u); do
    if [ ! -z "$pid" ]; then
      echo "Killing process $pid on port 3000"
      taskkill /F /PID $pid 2>/dev/null || true
    fi
  done
  
  # Port 3001
  for pid in $(netstat -ano | findstr :3001 | awk '{print $5}' | sort -u); do
    if [ ! -z "$pid" ]; then
      echo "Killing process $pid on port 3001"
      taskkill /F /PID $pid 2>/dev/null || true
    fi
  done
  
  # Port 8000
  for pid in $(netstat -ano | findstr :8000 | awk '{print $5}' | sort -u); do
    if [ ! -z "$pid" ]; then
      echo "Killing process $pid on port 8000"
      taskkill /F /PID $pid 2>/dev/null || true
    fi
  done
else
  # Linux/Mac
  lsof -ti:3000 | xargs kill -9 2>/dev/null || true
  lsof -ti:3001 | xargs kill -9 2>/dev/null || true
  lsof -ti:8000 | xargs kill -9 2>/dev/null || true
fi

# Clean Next.js lock files
echo "Cleaning Next.js lock files..."
cd apps/web
rm -rf .next/dev/lock .next/dev/*.lock 2>/dev/null || true
cd ../..

# Clean build artifacts (optional, uncomment if needed)
# echo "Cleaning build artifacts..."
# rm -rf apps/web/.next apps/api/dist 2>/dev/null || true

echo "✅ Cleanup complete!"
echo ""
echo "You can now run: npm run dev"
