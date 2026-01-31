"""
Higgsfield AI Worker - FastAPI application for processing AI jobs
"""
import asyncio
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from config import settings
from services.redis_service import redis_service
from services.queue_service import queue_service

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

app = FastAPI(title="Higgsfield AI Worker", version="0.1.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("Starting AI Worker...")
    
    # Check Redis connection
    if redis_service.is_connected():
        logger.info("Redis connection verified")
    else:
        logger.error("Redis connection failed")
    
    # Register queue processors (placeholder for now)
    # These will be implemented in Phase 6
    queue_service.register_processor("image-generation", lambda job: logger.info(f"Processing image generation: {job}"))
    queue_service.register_processor("video-synthesis", lambda job: logger.info(f"Processing video synthesis: {job}"))
    queue_service.register_processor("motion-transfer", lambda job: logger.info(f"Processing motion transfer: {job}"))
    queue_service.register_processor("post-processing", lambda job: logger.info(f"Processing post-processing: {job}"))
    
    # Start queue processing in background
    asyncio.create_task(queue_service.start())
    logger.info("Queue processing started")


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down AI Worker...")
    queue_service.stop()
    redis_service.close()
    logger.info("AI Worker shut down complete")


@app.get("/")
async def root():
    return {
        "message": "Higgsfield AI Worker",
        "status": "running",
        "redis_connected": redis_service.is_connected(),
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "redis_connected": redis_service.is_connected(),
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
