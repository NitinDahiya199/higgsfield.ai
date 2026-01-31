"""
Configuration for Higgsfield AI Worker
"""
import os
from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""
    
    # Redis
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    # Environment
    node_env: str = os.getenv("NODE_ENV", "development")
    debug: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    # API Keys (will be used later)
    stability_api_key: Optional[str] = os.getenv("STABILITY_API_KEY")
    openai_api_key: Optional[str] = os.getenv("OPENAI_API_KEY")
    runway_api_key: Optional[str] = os.getenv("RUNWAY_API_KEY")
    pika_api_key: Optional[str] = os.getenv("PIKA_API_KEY")
    
    # Storage (will be configured later)
    aws_access_key_id: Optional[str] = os.getenv("AWS_ACCESS_KEY_ID")
    aws_secret_access_key: Optional[str] = os.getenv("AWS_SECRET_ACCESS_KEY")
    aws_region: str = os.getenv("AWS_REGION", "us-east-1")
    aws_s3_bucket: str = os.getenv("AWS_S3_BUCKET", "higgsfield-assets")
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
