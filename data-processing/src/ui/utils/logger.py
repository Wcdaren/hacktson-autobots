"""
Search Logging Utility
Logs all searches to hourly JSON files.
"""
import json
from datetime import datetime
from pathlib import Path
import logging
import os

logger = logging.getLogger(__name__)


class SearchLogger:
    """Logs search queries and results to hourly JSON files."""
    
    def __init__(self, logs_dir=None):
        """Initialize logger with ui/logs directory."""
        if logs_dir is None:
            # Get the directory where this file is located (src/ui/utils/)
            # and go up to src/ui/logs/
            this_file = Path(__file__).resolve()
            self.logs_dir = this_file.parent.parent / 'logs'
        else:
            self.logs_dir = Path(logs_dir)
        
        self.logs_dir.mkdir(parents=True, exist_ok=True)
        logger.info(f"SearchLogger initialized with logs_dir: {self.logs_dir}")
    
    def log_search(self, search_type: str, query: str, result: dict):
        """
        Log a search query and its results.
        
        Args:
            search_type: 'text' or 'image'
            query: The search query (or '[image_upload]' for images)
            result: The search result dictionary
        """
        try:
            # Create hourly log file name
            hour_str = datetime.now().strftime('%Y%m%d_%H')
            log_file = self.logs_dir / f'ui_search_logs_{hour_str}.json'
            
            # Extract ALL results with scores for analysis
            all_results = []
            for idx, r in enumerate(result.get('results', []), 1):
                all_results.append({
                    "rank": idx,
                    "variant_id": r.get('variant_id'),
                    "variant_name": r.get('variant_name'),
                    "product_name": r.get('product_name'),
                    "price": r.get('price'),
                    "currency": r.get('currency', 'SGD'),
                    "score": r.get('score'),
                    "frontend_category": r.get('frontend_category'),
                    "material": r.get('material'),
                    "color_tone": r.get('color_tone')
                })
            
            # Create log entry
            log_entry = {
                "timestamp": datetime.now().isoformat(),
                "search_type": search_type,
                "query": query if search_type == "text" else "[image_upload]",
                "status": result.get('status', 'unknown'),
                "total_results": result.get('total_results', 0),
                "response_time_ms": result.get('search_metadata', {}).get('response_time_ms', 0),
                "search_mode": result.get('search_metadata', {}).get('search_mode', ''),
                "filters_applied": result.get('search_metadata', {}).get('filters_applied', {}),
                "llm_fallback_used": result.get('search_metadata', {}).get('llm_fallback_used', False),
                "enhanced_query": result.get('search_metadata', {}).get('enhanced_query'),
                "all_results": all_results  # All results with scores for analysis
            }
            
            # Read existing logs
            logs = []
            if log_file.exists():
                with open(log_file, 'r') as f:
                    logs = json.load(f)
            
            # Append new log entry
            logs.append(log_entry)
            
            # Write back to file
            with open(log_file, 'w') as f:
                json.dump(logs, f, indent=2)
            
            logger.info(f"Logged {search_type} search to {log_file}")
            
        except Exception as e:
            logger.error(f"Failed to log search: {str(e)}")
    
    def log_error(self, search_type: str, query: str, error: str):
        """
        Log a search error.
        
        Args:
            search_type: 'text' or 'image'
            query: The search query that caused the error
            error: Error message
        """
        try:
            hour_str = datetime.now().strftime('%Y%m%d_%H')
            log_file = self.logs_dir / f'ui_search_logs_{hour_str}.json'
            
            log_entry = {
                "timestamp": datetime.now().isoformat(),
                "search_type": search_type,
                "query": query if search_type == "text" else "[image_upload]",
                "status": "error",
                "error_message": error
            }
            
            logs = []
            if log_file.exists():
                with open(log_file, 'r') as f:
                    logs = json.load(f)
            
            logs.append(log_entry)
            
            with open(log_file, 'w') as f:
                json.dump(logs, f, indent=2)
            
            logger.info(f"Logged error to {log_file}")
            
        except Exception as e:
            logger.error(f"Failed to log error: {str(e)}")
