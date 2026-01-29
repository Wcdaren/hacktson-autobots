"""
Image Loader Utility
Loads and caches product images from variant_image.csv
"""
import pandas as pd
from pathlib import Path
import logging

logger = logging.getLogger(__name__)


class ImageLoader:
    """Loads and provides access to product images."""
    
    def __init__(self, csv_path='data/active_only/variant_image.csv'):
        # Get path relative to src directory
        # __file__ is in src/ui/utils/, so go up 2 levels to src, then up 1 more to project root
        self.csv_path = Path(__file__).parent.parent.parent.parent / csv_path
        self.images_df = None
        self._load_images()
    
    def _load_images(self):
        """Load images from CSV file."""
        try:
            logger.info(f"Loading images from {self.csv_path}")
            self.images_df = pd.read_csv(self.csv_path)
            logger.info(f"✓ Loaded {len(self.images_df)} images")
        except Exception as e:
            logger.error(f"Failed to load images: {str(e)}")
            self.images_df = pd.DataFrame()
    
    def get_default_image(self, variant_id):
        """
        Get the default image URL for a variant.
        
        Args:
            variant_id: The variant ID to get image for
            
        Returns:
            Image URL string or empty string if not found
        """
        if self.images_df is None or len(self.images_df) == 0:
            return ""
        
        try:
            # Convert variant_id to int for comparison
            variant_id = int(variant_id)
            
            # Get images for this variant
            variant_images = self.images_df[self.images_df['variant_id'] == variant_id]
            
            if len(variant_images) == 0:
                return ""
            
            # Try to get default image
            default_images = variant_images[variant_images['default_image'] == True]
            if len(default_images) > 0:
                return default_images.iloc[0]['image_url']
            
            # If no default, get first image (lowest image_position)
            sorted_images = variant_images.sort_values('image_position')
            return sorted_images.iloc[0]['image_url']
            
        except Exception as e:
            logger.error(f"Error getting image for variant {variant_id}: {str(e)}")
            return ""
    
    def get_all_images(self, variant_id):
        """
        Get all images for a variant, sorted by position.
        
        Args:
            variant_id: The variant ID to get images for
            
        Returns:
            List of dicts with image info (url, type, position, is_default)
        """
        if self.images_df is None or len(self.images_df) == 0:
            return []
        
        try:
            variant_id = int(variant_id)
            variant_images = self.images_df[self.images_df['variant_id'] == variant_id]
            
            if len(variant_images) == 0:
                return []
            
            # Sort by position
            sorted_images = variant_images.sort_values('image_position')
            
            # Convert to list of dicts
            images = []
            for _, row in sorted_images.iterrows():
                images.append({
                    'url': row['image_url'],
                    'type': row['image_type'],
                    'position': row['image_position'],
                    'is_default': row['default_image']
                })
            
            return images
            
        except Exception as e:
            logger.error(f"Error getting images for variant {variant_id}: {str(e)}")
            return []
