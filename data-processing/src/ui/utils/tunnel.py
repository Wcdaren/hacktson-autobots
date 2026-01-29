"""
SSH Tunnel Management for OpenSearch Access
"""
import os
import time
import logging
from sshtunnel import SSHTunnelForwarder

logger = logging.getLogger(__name__)


class SSHTunnelManager:
    """Manages SSH tunnel connection to OpenSearch."""
    
    def __init__(self):
        self.tunnel = None
        self.ssh_key_path = os.path.expanduser(
            os.getenv('SSH_KEY_PATH', '~/.ssh/id_rsa')
        )
    
    def start(self):
        """Start SSH tunnel."""
        if self.tunnel and self.tunnel.is_active:
            logger.info("SSH tunnel already active")
            return
        
        try:
            logger.info("Starting SSH tunnel...")
            self.tunnel = SSHTunnelForwarder(
                ('jumphost-sg.castlery.com', 22),
                ssh_username='autobots',
                ssh_pkey=self.ssh_key_path,
                remote_bind_address=(
                    'vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com',
                    443
                ),
                local_bind_address=('127.0.0.1', 9200)
            )
            self.tunnel.start()
            time.sleep(2)  # Wait for tunnel to establish
            logger.info("✓ SSH tunnel started successfully")
        except Exception as e:
            logger.error(f"Failed to start SSH tunnel: {str(e)}")
            raise
    
    def stop(self):
        """Stop SSH tunnel."""
        if self.tunnel:
            try:
                self.tunnel.stop()
                logger.info("SSH tunnel stopped")
            except Exception as e:
                logger.error(f"Error stopping SSH tunnel: {str(e)}")
    
    def is_active(self):
        """Check if tunnel is active."""
        return self.tunnel and self.tunnel.is_active
