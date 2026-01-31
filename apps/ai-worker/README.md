# AI Worker

FastAPI-based worker service for processing AI jobs using BullMQ queues.

## Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Set up environment variables:

```bash
cp ../../env.example .env
# Edit .env with your configuration
```

3. Ensure Redis is running (via Docker Compose):

```bash
docker-compose up -d redis
```

4. Start the worker:

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The worker will be available at `http://localhost:8000`

## Health Check

- `GET /` - Basic status and Redis connection status
- `GET /health` - Health check endpoint

## Project Structure

```
.
├── main.py              # FastAPI application entry point
├── config.py           # Configuration settings
├── services/           # Service modules
│   ├── redis_service.py    # Redis connection and operations
│   └── queue_service.py    # BullMQ queue processing
└── workers/            # Worker implementations (to be added in Phase 6)
    ├── image_generation.py
    ├── video_synthesis.py
    ├── motion_transfer.py
    └── post_processing.py
```

## Job Queues

The worker processes jobs from the following BullMQ queues:

- `image-generation` - Text to image generation
- `video-synthesis` - Image to video synthesis
- `motion-transfer` - Motion transfer and animation
- `post-processing` - Video post-processing and enhancement

## Environment Variables

- `REDIS_URL` - Redis connection URL (default: `redis://localhost:6379`)
- `NODE_ENV` - Environment (development/production)
- `DEBUG` - Enable debug logging (true/false)
- API keys for AI services (to be configured in Phase 6)

## Development

The worker automatically connects to Redis on startup and begins processing jobs from registered queues. Worker implementations for each job type will be added in Phase 6.
