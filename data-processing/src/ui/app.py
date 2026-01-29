"""
Castlery Semantic Search Demo UI
Streamlit application for showcasing text and image search functionality.
"""
import streamlit as st
import yaml
import os
import sys
import base64
import logging
from pathlib import Path
from PIL import Image
import io

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from unit_4_search_query.search_service import SearchQueryService
from ui.utils.tunnel import SSHTunnelManager
from ui.utils.logger import SearchLogger
from ui.utils.image_loader import ImageLoader
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Page config
st.set_page_config(
    page_title="Castlery Semantic Search",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS - Castlery Brand Style
st.markdown("""
<style>
    /* Main background */
    .stApp {
        background-color: #FAFAFA;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Custom header */
    .main-header {
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 28px;
        font-weight: 300;
        color: #000000;
        letter-spacing: 3px;
        margin-bottom: 10px;
        text-align: center;
    }
    
    .sub-header {
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 14px;
        font-weight: 300;
        color: #666666;
        letter-spacing: 1px;
        margin-bottom: 30px;
        text-align: center;
    }
    
    /* Product cards */
    .product-card {
        background: #FFFFFF;
        border: 1px solid #E5E5E5;
        border-radius: 4px;
        padding: 16px;
        margin-bottom: 16px;
        transition: box-shadow 0.2s ease;
        height: 100%;
    }
    
    .product-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    /* Product image */
    .product-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        margin-bottom: 12px;
        border-radius: 2px;
    }
    
    /* Product name */
    .product-name {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        margin: 8px 0 4px 0;
        line-height: 1.4;
    }
    
    /* Product price */
    .product-price {
        font-size: 16px;
        font-weight: 600;
        color: #000000;
        margin: 4px 0;
    }
    
    /* Product category */
    .product-category {
        font-size: 11px;
        color: #888888;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-top: 4px;
    }
    
    /* Search button */
    .stButton > button {
        background-color: #000000;
        color: #FFFFFF;
        border: none;
        border-radius: 0;
        padding: 12px 32px;
        font-weight: 500;
        letter-spacing: 1px;
        width: 100%;
    }
    
    .stButton > button:hover {
        background-color: #333333;
    }
    
    /* Tabs */
    .stTabs [data-baseweb="tab-list"] {
        gap: 24px;
        border-bottom: 1px solid #E5E5E5;
    }
    
    .stTabs [data-baseweb="tab"] {
        font-size: 14px;
        font-weight: 500;
        color: #666666;
        letter-spacing: 1px;
        padding: 12px 0;
        background-color: transparent;
    }
    
    .stTabs [aria-selected="true"] {
        color: #000000;
        border-bottom: 2px solid #000000;
    }
    
    /* Results info */
    .results-info {
        font-size: 13px;
        color: #666666;
        margin: 20px 0;
        text-align: center;
    }
    
    /* File uploader */
    .stFileUploader {
        border: 2px dashed #E5E5E5;
        border-radius: 4px;
        padding: 40px;
        text-align: center;
    }
    
    /* Link styling */
    a {
        color: #000000;
        text-decoration: none;
    }
    
    a:hover {
        color: #C4A77D;
    }
</style>
""", unsafe_allow_html=True)


@st.cache_resource
def init_services():
    """Initialize search service and SSH tunnel (cached)."""
    try:
        # Start SSH tunnel
        tunnel_manager = SSHTunnelManager()
        tunnel_manager.start()
        
        # Load config
        config_path = Path(__file__).parent.parent / 'config.yaml'
        with open(config_path, 'r') as f:
            config = yaml.safe_load(f)
        
        # Override OpenSearch config for SSH tunnel
        config['aws']['opensearch']['endpoint'] = 'https://127.0.0.1:9200'
        config['aws']['opensearch']['use_iam_auth'] = False
        config['aws']['opensearch']['verify_certs'] = False
        config['aws']['opensearch']['ssl_show_warn'] = False
        
        # Initialize search service
        search_service = SearchQueryService(config)
        
        # Initialize logger
        search_logger = SearchLogger()
        
        # Initialize image loader
        image_loader = ImageLoader()
        
        logger.info("✓ All services initialized successfully")
        return search_service, search_logger, tunnel_manager, image_loader
        
    except Exception as e:
        logger.error(f"Failed to initialize services: {str(e)}")
        st.error(f"Failed to initialize services: {str(e)}")
        st.stop()


def display_product_card(product, col, image_loader):
    """Display a single product card."""
    with col:
        # Get product details
        variant_id = product.get('variant_id', '')
        variant_name = product.get('variant_name', 'Unknown Product')
        price = product.get('price', 0)
        currency = product.get('currency', 'SGD')
        category = product.get('frontend_category', '')
        variant_url = product.get('variant_url', '#')
        
        # Get image from image loader
        image_url = image_loader.get_default_image(variant_id) if variant_id else ''
        
        # If no image from loader, try from product data
        if not image_url:
            image_url = product.get('image_url', '')
        
        # Display card
        st.markdown(f'<div class="product-card">', unsafe_allow_html=True)
        
        # Display image
        if image_url:
            try:
                st.image(image_url, use_container_width=True)
            except:
                st.markdown('<div style="height: 200px; background: #F0F0F0; display: flex; align-items: center; justify-content: center; color: #999;">Image not available</div>', unsafe_allow_html=True)
        else:
            st.markdown('<div style="height: 200px; background: #F0F0F0; display: flex; align-items: center; justify-content: center; color: #999;">No Image</div>', unsafe_allow_html=True)
        
        # Product details
        st.markdown(f'<div class="product-name">{variant_name}</div>', unsafe_allow_html=True)
        st.markdown(f'<div class="product-price">${price:.2f} {currency}</div>', unsafe_allow_html=True)
        if category:
            st.markdown(f'<div class="product-category">{category}</div>', unsafe_allow_html=True)
        
        # Link to product
        if variant_url and variant_url != '#':
            st.markdown(f'<a href="{variant_url}" target="_blank" style="font-size: 12px; color: #C4A77D;">View Product →</a>', unsafe_allow_html=True)
        
        st.markdown('</div>', unsafe_allow_html=True)


def main():
    """Main application."""
    
    # Initialize services
    search_service, search_logger, tunnel_manager, image_loader = init_services()
    
    # Header
    st.markdown('<div class="main-header">CASTLERY</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Semantic Search Demo</div>', unsafe_allow_html=True)
    
    # Tabs for search modes
    tab1, tab2 = st.tabs(["Text Search", "Image Search"])
    
    # Text Search Tab
    with tab1:
        st.markdown("<br>", unsafe_allow_html=True)
        
        # Search input
        col1, col2 = st.columns([5, 1])
        with col1:
            query = st.text_input(
                "Search",
                placeholder="Search for furniture... (e.g., 'grey leather sofa under $2000')",
                label_visibility="collapsed"
            )
        with col2:
            search_button = st.button("Search", key="text_search", use_container_width=True)
        
        # Perform search
        if search_button and query:
            with st.spinner("Searching..."):
                try:
                    result = search_service.get_text_results(query)
                    
                    # Log the search
                    search_logger.log_search('text', query, result)
                    
                    if result.get('status') == 'success':
                        products = result.get('results', [])
                        total_results = result.get('total_results', 0)
                        response_time = result.get('search_metadata', {}).get('response_time_ms', 0)
                        
                        # Display results info
                        st.markdown(f'<div class="results-info">{total_results} results found ({response_time}ms)</div>', unsafe_allow_html=True)
                        
                        # Display products in grid (4 columns)
                        if products:
                            for i in range(0, len(products), 4):
                                cols = st.columns(4)
                                for j, col in enumerate(cols):
                                    if i + j < len(products):
                                        display_product_card(products[i + j], col, image_loader)
                        else:
                            st.info("No products found. Try a different search query.")
                    else:
                        error_msg = result.get('message', 'Unknown error')
                        st.error(f"Search failed: {error_msg}")
                        search_logger.log_error('text', query, error_msg)
                        
                except Exception as e:
                    error_msg = str(e)
                    st.error(f"An error occurred: {error_msg}")
                    search_logger.log_error('text', query, error_msg)
                    logger.error(f"Text search error: {error_msg}", exc_info=True)
    
    # Image Search Tab
    with tab2:
        st.markdown("<br>", unsafe_allow_html=True)
        
        # Image upload
        uploaded_file = st.file_uploader(
            "Upload an image",
            type=['jpg', 'jpeg', 'png'],
            help="Upload a furniture image to find similar products",
            label_visibility="collapsed"
        )
        
        if uploaded_file is not None:
            # Display uploaded image
            col1, col2, col3 = st.columns([1, 2, 1])
            with col2:
                image = Image.open(uploaded_file)
                st.image(image, caption="Uploaded Image", use_container_width=True)
            
            # Search button
            if st.button("Find Similar Products", key="image_search", use_container_width=False):
                with st.spinner("Searching for similar products..."):
                    try:
                        # Convert image to base64
                        uploaded_file.seek(0)
                        image_bytes = uploaded_file.read()
                        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
                        
                        # Perform search
                        result = search_service.get_image_match_result(image_base64)
                        
                        # Log the search
                        search_logger.log_search('image', '[image_upload]', result)
                        
                        if result.get('status') == 'success':
                            products = result.get('results', [])
                            total_results = result.get('total_results', 0)
                            response_time = result.get('search_metadata', {}).get('response_time_ms', 0)
                            
                            # Display results info
                            st.markdown(f'<div class="results-info">{total_results} similar products found ({response_time}ms)</div>', unsafe_allow_html=True)
                            
                            # Display products in grid (4 columns)
                            if products:
                                for i in range(0, len(products), 4):
                                    cols = st.columns(4)
                                    for j, col in enumerate(cols):
                                        if i + j < len(products):
                                            display_product_card(products[i + j], col, image_loader)
                            else:
                                st.info("No similar products found.")
                        else:
                            error_msg = result.get('message', 'Unknown error')
                            st.error(f"Search failed: {error_msg}")
                            search_logger.log_error('image', '[image_upload]', error_msg)
                            
                    except Exception as e:
                        error_msg = str(e)
                        st.error(f"An error occurred: {error_msg}")
                        search_logger.log_error('image', '[image_upload]', error_msg)
                        logger.error(f"Image search error: {error_msg}", exc_info=True)


if __name__ == '__main__':
    main()
