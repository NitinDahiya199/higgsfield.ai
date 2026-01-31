#!/bin/bash

# Setup script for Higgsfield.ai project

set -e

echo "🚀 Setting up Higgsfield.ai project..."

# Check Node.js version
echo "📦 Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
  echo "❌ Node.js 18+ is required. Current version: $(node -v)"
  exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install workspace dependencies
echo "📦 Installing workspace dependencies..."
npm install --workspaces

# Copy environment file
if [ ! -f .env ]; then
  echo "📝 Creating .env file from template..."
  cp env.example .env
  echo "⚠️  Please update .env with your configuration"
fi

# Check Docker
echo "🐳 Checking Docker..."
if command -v docker &> /dev/null; then
  echo "✅ Docker is installed"
  if docker ps &> /dev/null; then
    echo "✅ Docker is running"
  else
    echo "⚠️  Docker is not running. Please start Docker to use docker-compose"
  fi
else
  echo "⚠️  Docker is not installed. Install Docker to use docker-compose"
fi

# Setup Python virtual environment (optional)
if command -v python3 &> /dev/null; then
  echo "🐍 Setting up Python virtual environment..."
  cd apps/ai-worker
  if [ ! -d "venv" ]; then
    python3 -m venv venv
  fi
  source venv/bin/activate
  pip install -r requirements.txt
  deactivate
  cd ../..
  echo "✅ Python environment set up"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your configuration"
echo "2. Start Docker services: docker-compose up -d"
echo "3. Run development servers: npm run dev"
echo ""
