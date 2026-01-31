"""
Queue service for processing BullMQ jobs
"""
import json
import logging
import asyncio
from typing import Dict, Callable, Any
from services.redis_service import redis_service

logger = logging.getLogger(__name__)


class QueueService:
    """Service for processing job queues"""
    
    def __init__(self):
        self.processors: Dict[str, Callable] = {}
        self.running = False
    
    def register_processor(self, queue_name: str, processor: Callable):
        """Register a processor for a queue"""
        self.processors[queue_name] = processor
        logger.info(f"Registered processor for queue: {queue_name}")
    
    async def process_queue(self, queue_name: str):
        """Process jobs from a queue"""
        if not redis_service.is_connected():
            logger.error("Redis is not connected")
            return
        
        logger.info(f"Starting to process queue: {queue_name}")
        
        while self.running:
            try:
                # BullMQ stores jobs in a list with key: {queue_name}:wait
                wait_key = f"bull:{queue_name}:wait"
                active_key = f"bull:{queue_name}:active"
                
                # Get job from wait list (BLPOP - blocking pop)
                result = redis_service.client.blpop([wait_key], timeout=1)
                
                if result:
                    queue, job_id = result
                    logger.info(f"Processing job {job_id} from queue {queue_name}")
                    
                    # Move job to active list
                    job_data_key = f"bull:{queue_name}:{job_id}"
                    job_data = redis_service.client.get(job_data_key)
                    
                    if job_data:
                        try:
                            job = json.loads(job_data)
                            
                            # Add to active list
                            redis_service.client.lpush(active_key, job_id)
                            
                            # Process job
                            if queue_name in self.processors:
                                processor = self.processors[queue_name]
                                
                                # Check if processor is async
                                import inspect
                                if inspect.iscoroutinefunction(processor):
                                    result = await processor(job)
                                else:
                                    result = processor(job)
                                
                                # Move to completed
                                completed_key = f"bull:{queue_name}:completed"
                                redis_service.client.lpush(completed_key, job_id)
                                redis_service.client.lrem(active_key, 1, job_id)
                                
                                logger.info(f"Job {job_id} completed successfully")
                            else:
                                logger.warning(f"No processor registered for queue {queue_name}")
                                # Move to failed
                                failed_key = f"bull:{queue_name}:failed"
                                redis_service.client.lpush(failed_key, job_id)
                                redis_service.client.lrem(active_key, 1, job_id)
                                
                        except Exception as e:
                            logger.error(f"Error processing job {job_id}: {e}")
                            # Move to failed
                            failed_key = f"bull:{queue_name}:failed"
                            redis_service.client.lpush(failed_key, job_id)
                            redis_service.client.lrem(active_key, 1, job_id)
                
            except Exception as e:
                logger.error(f"Error in queue processing loop: {e}")
                await asyncio.sleep(1)
    
    async def start(self):
        """Start processing all registered queues"""
        self.running = True
        tasks = []
        
        for queue_name in self.processors.keys():
            task = asyncio.create_task(self.process_queue(queue_name))
            tasks.append(task)
        
        logger.info(f"Started processing {len(tasks)} queues")
        
        # Wait for all tasks
        await asyncio.gather(*tasks)
    
    def stop(self):
        """Stop processing queues"""
        self.running = False
        logger.info("Stopped queue processing")


# Global queue service instance
queue_service = QueueService()
