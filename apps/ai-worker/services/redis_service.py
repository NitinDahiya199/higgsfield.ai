"""
Redis service for connecting to Redis and managing BullMQ queues
"""
import redis
import json
import logging
from typing import Optional, Any
from config import settings

logger = logging.getLogger(__name__)


class RedisService:
    """Service for Redis operations"""
    
    def __init__(self):
        self.client: Optional[redis.Redis] = None
        self._connect()
    
    def _connect(self):
        """Connect to Redis"""
        try:
            self.client = redis.from_url(
                settings.redis_url,
                decode_responses=True,
                socket_connect_timeout=5,
                socket_timeout=5,
                retry_on_timeout=True,
            )
            # Test connection
            self.client.ping()
            logger.info("Connected to Redis successfully")
        except redis.ConnectionError as e:
            logger.error(f"Failed to connect to Redis: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error connecting to Redis: {e}")
            raise
    
    def is_connected(self) -> bool:
        """Check if Redis is connected"""
        try:
            return self.client is not None and self.client.ping()
        except:
            return False
    
    def get(self, key: str) -> Optional[str]:
        """Get value from Redis"""
        try:
            return self.client.get(key)
        except Exception as e:
            logger.error(f"Error getting key {key}: {e}")
            return None
    
    def set(self, key: str, value: str, ttl: Optional[int] = None) -> bool:
        """Set value in Redis"""
        try:
            if ttl:
                return self.client.setex(key, ttl, value)
            else:
                return self.client.set(key, value)
        except Exception as e:
            logger.error(f"Error setting key {key}: {e}")
            return False
    
    def delete(self, key: str) -> bool:
        """Delete key from Redis"""
        try:
            return bool(self.client.delete(key))
        except Exception as e:
            logger.error(f"Error deleting key {key}: {e}")
            return False
    
    def close(self):
        """Close Redis connection"""
        if self.client:
            self.client.close()
            logger.info("Redis connection closed")


# Global Redis service instance
redis_service = RedisService()
