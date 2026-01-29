# UI Development Prompt: Semantic Search Demo Interface

## Overview

Build a simple, elegant demo UI for the E-Commerce Semantic Search Engine using Python (Streamlit). The UI should showcase the search functionality that has already been built and tested.

---

## Project Context

### Existing Backend Services
The search backend is fully functional with the following capabilities:
- **Text Search**: Semantic search with filter extraction, hybrid search (KNN + BM25 + RRF)
- **Image Search**: Visual similarity search using image embeddings
- **LLM Fallback**: Intent extraction for abstract queries (Feature 5)

### Key Files to Reference
| File | Purpose |
|------|---------|
| `src/unit_4_search_query/search_service.py` | Main search service with `get_text_results()` and `get_image_match_result()` APIs |
| `src/test_search_functions.py` | Working examples of how to call search functions |
| `src/app.py` | Flask API server (reference for API structure) |
| `src/config.yaml` | Configuration for AWS services, search parameters |

### API Response Format
```json
{
  "status": "success",
  "total_results": 50,
  "results": [
    {
      "variant_id": "32299",
      "variant_name": "Vincent Dining Table 220cm, Walnut",
      "product_name": "Vincent Dining Table",
      "price": 1499.00,
      "currency": "SGD",
      "image_url": "https://...",
      "score": 0.5125,
      "frontend_category": "Tables",
      "material": "Walnut",
      "color_tone": "Brown",
      "review_rating": 4.5,
      "variant_url": "https://..."
    }
  ],
  "search_metadata": {
    "query": "walnut dining table",
    "search_mode": "hybrid",
    "filters_applied": {"materials": ["Walnut"]},
    "llm_fallback_used": false,
    "response_time_ms": 850
  }
}
```

---

## Requirements

### 1. Technology Choice
- **Framework**: Streamlit (faster to build, better for demos)
- **Virtual Environment**: `/Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search`

### 2. Core Features

#### 2.1 Search Input
- Single search bar that accepts:
  - **Text queries**: Natural language search (e.g., "grey leather sofa under $2000")
  - **Image upload**: Drag-and-drop or file picker for JPG/PNG images
- Clear visual indication of which search mode is active
- Search button or Enter key to trigger search

#### 2.2 Search Results Display
- Grid view of product results
- Each result card should show:
  - Product image (thumbnail)
  - Product name / Variant name
  - Price with currency
  - Category
  - Click to open product URL in new tab
- Show total results count and response time

### 3. Infrastructure Requirements

#### 3.1 SSH Tunnel for OpenSearch
The UI must establish an SSH tunnel to access OpenSearch (same as `test_search_functions.py`):
```python
from sshtunnel import SSHTunnelForwarder

tunnel = SSHTunnelForwarder(
    ('jumphost-sg.castlery.com', 22),
    ssh_username='autobots',
    ssh_pkey=ssh_key_path,
    remote_bind_address=(
        'vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com',
        443
    ),
    local_bind_address=('127.0.0.1', 9200)
)
```

#### 3.2 Configuration Override
Override OpenSearch config for SSH tunnel:
```python
config['aws']['opensearch']['endpoint'] = 'https://127.0.0.1:9200'
config['aws']['opensearch']['use_iam_auth'] = False
config['aws']['opensearch']['verify_certs'] = False
```

### 4. Logging Requirements

#### 4.1 Search Logs (Backend Only - Not Shown in UI)
- Log every search query with full metadata
- Save logs to `src/unit_4_search_query/logs/` directory
- Create new log file every hour: `ui_search_logs_YYYYMMDD_HH.json`
- Log format:
```json
{
  "timestamp": "2026-01-29T19:15:30.123456",
  "search_type": "text|image",
  "query": "grey sofa under $1000",
  "total_results": 50,
  "response_time_ms": 850,
  "search_mode": "hybrid",
  "filters_applied": {...},
  "llm_fallback_used": false,
  "enhanced_query": null,
  "top_3_results": [
    {"variant_id": "123", "variant_name": "...", "price": 999, "score": 0.85}
  ]
}
```

#### 4.2 Error Logging
- Log all errors with stack traces
- Include user input that caused the error

---

## UI Design Guidelines

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│  CASTLERY                                                   │
│  Semantic Search Demo                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Text Search] [Image Search]  <- Tab selector              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Search for furniture...                   [Search] │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  OR (for image tab):                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  📷 Drag and drop an image or click to upload       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  50 results found (850ms)                                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  [img]  │  │  [img]  │  │  [img]  │  │  [img]  │        │
│  │ Name    │  │ Name    │  │ Name    │  │ Name    │        │
│  │ $1,299  │  │ $899    │  │ $1,499  │  │ $749    │        │
│  │ Tables  │  │ Sofas   │  │ Chairs  │  │ Beds    │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  ...    │  │  ...    │  │  ...    │  │  ...    │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Color Scheme (Castlery Brand)
Based on Castlery's website design - minimalist, warm, and elegant:

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Text | Black | `#000000` |
| Secondary Text | Dark Gray | `#666666` |
| Background | Off-White/Cream | `#FAFAFA` |
| Cards | White | `#FFFFFF` |
| Accent/CTA | Warm Tan/Gold | `#C4A77D` |
| Borders | Light Gray | `#E5E5E5` |
| Hover States | Soft Beige | `#F5F0EB` |
| Price Text | Black | `#000000` |
| Category Text | Medium Gray | `#888888` |

### Typography
- Clean, sans-serif fonts (similar to Castlery's use of clean typography)
- Product names: Medium weight, 14-16px
- Prices: Bold, 14-16px
- Categories: Light weight, 12px, uppercase

### Design Principles
- Minimalist and clean
- Generous white space
- Subtle shadows on cards
- No harsh colors - warm and inviting
- Focus on product images

---

## Implementation Plan

### Phase 1: Basic Setup (30 min)
- [ ] Create `src/ui/` directory
- [ ] Set up Streamlit app skeleton with Castlery styling
- [ ] Implement SSH tunnel connection
- [ ] Initialize SearchQueryService

### Phase 2: Text Search (45 min)
- [ ] Create search input component
- [ ] Implement text search functionality
- [ ] Display results in grid format
- [ ] Add loading states

### Phase 3: Image Search (45 min)
- [ ] Add image upload component with tabs
- [ ] Implement image search functionality
- [ ] Handle image preview
- [ ] Display image search results

### Phase 4: Logging & Polish (30 min)
- [ ] Implement hourly logging (backend only)
- [ ] Error handling and user feedback
- [ ] Style refinements to match Castlery brand

### Phase 5: Testing (15 min)
- [ ] Test text search with various queries
- [ ] Test image search with sample images
- [ ] Verify logging works correctly

---

## File Structure

```
src/
├── ui/
│   ├── app.py              # Main Streamlit app
│   └── utils/
│       ├── tunnel.py       # SSH tunnel management
│       └── logger.py       # Search logging utility
└── unit_4_search_query/
    └── logs/
        └── ui_search_logs_*.json  # Hourly log files
```

---

## Sample Code Snippets

### Initialize Search Service
```python
import yaml
import os
from sshtunnel import SSHTunnelForwarder
from unit_4_search_query.search_service import SearchQueryService

def init_search_service():
    # Setup SSH tunnel
    tunnel = SSHTunnelForwarder(
        ('jumphost-sg.castlery.com', 22),
        ssh_username='autobots',
        ssh_pkey=os.path.expanduser(os.getenv('SSH_KEY_PATH', '~/.ssh/id_rsa')),
        remote_bind_address=(
            'vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com',
            443
        ),
        local_bind_address=('127.0.0.1', 9200)
    )
    tunnel.start()
    
    # Load and override config
    with open('config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    
    config['aws']['opensearch']['endpoint'] = 'https://127.0.0.1:9200'
    config['aws']['opensearch']['use_iam_auth'] = False
    config['aws']['opensearch']['verify_certs'] = False
    
    return SearchQueryService(config), tunnel
```

### Text Search Call
```python
result = search_service.get_text_results("grey leather sofa under $2000")
if result['status'] == 'success':
    products = result['results']
    metadata = result['search_metadata']
```

### Image Search Call
```python
import base64

# Read uploaded image
image_bytes = uploaded_file.read()
image_base64 = base64.b64encode(image_bytes).decode('utf-8')

result = search_service.get_image_match_result(image_base64)
if result['status'] == 'success':
    similar_products = result['results']
```

### Hourly Logging
```python
from datetime import datetime
import json
from pathlib import Path

def log_search(search_type, query, result):
    logs_dir = Path('unit_4_search_query/logs')
    logs_dir.mkdir(parents=True, exist_ok=True)
    
    # Hourly log file
    hour_str = datetime.now().strftime('%Y%m%d_%H')
    log_file = logs_dir / f'ui_search_logs_{hour_str}.json'
    
    # Get top 3 results for logging
    top_3 = []
    for r in result.get('results', [])[:3]:
        top_3.append({
            "variant_id": r.get('variant_id'),
            "variant_name": r.get('variant_name'),
            "price": r.get('price'),
            "score": r.get('score')
        })
    
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "search_type": search_type,
        "query": query if search_type == "text" else "[image_upload]",
        "total_results": result.get('total_results', 0),
        "response_time_ms": result.get('search_metadata', {}).get('response_time_ms', 0),
        "search_mode": result.get('search_metadata', {}).get('search_mode', ''),
        "filters_applied": result.get('search_metadata', {}).get('filters_applied', {}),
        "llm_fallback_used": result.get('search_metadata', {}).get('llm_fallback_used', False),
        "enhanced_query": result.get('search_metadata', {}).get('enhanced_query'),
        "top_3_results": top_3
    }
    
    # Append to log file
    logs = []
    if log_file.exists():
        with open(log_file, 'r') as f:
            logs = json.load(f)
    
    logs.append(log_entry)
    
    with open(log_file, 'w') as f:
        json.dump(logs, f, indent=2)
```

### Streamlit Custom CSS (Castlery Style)
```python
st.markdown("""
<style>
    /* Main background */
    .stApp {
        background-color: #FAFAFA;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    /* Custom header */
    .main-header {
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 24px;
        font-weight: 300;
        color: #000000;
        letter-spacing: 2px;
        margin-bottom: 20px;
    }
    
    /* Product cards */
    .product-card {
        background: #FFFFFF;
        border: 1px solid #E5E5E5;
        border-radius: 4px;
        padding: 16px;
        transition: box-shadow 0.2s ease;
    }
    
    .product-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    /* Product name */
    .product-name {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        margin: 8px 0 4px 0;
    }
    
    /* Product price */
    .product-price {
        font-size: 14px;
        font-weight: 600;
        color: #000000;
    }
    
    /* Product category */
    .product-category {
        font-size: 11px;
        color: #888888;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    /* Search button */
    .stButton > button {
        background-color: #000000;
        color: #FFFFFF;
        border: none;
        border-radius: 0;
        padding: 10px 24px;
        font-weight: 500;
        letter-spacing: 1px;
    }
    
    .stButton > button:hover {
        background-color: #333333;
    }
</style>
""", unsafe_allow_html=True)
```

---

## Success Criteria

1. ✅ User can enter text queries and see relevant product results
2. ✅ User can upload an image and see visually similar products
3. ✅ All searches are logged hourly with full metadata
4. ✅ UI matches Castlery's minimalist brand aesthetic
5. ✅ Error states are handled gracefully
6. ✅ Loading states provide good UX

---

## Notes

- Focus on functionality first, then polish styling
- The SSH tunnel must remain active during the entire session
- Image search may take slightly longer due to embedding generation
- LLM features (Claude) may not work due to account restrictions - handle gracefully
- Test with queries from `test_search_functions.py` to verify consistency

---

## Future Enhancements (Out of Scope for Now)

- Related Tags (Feature 6) - clickable refinement tags
- Search history
- Favorites/wishlist
- Product comparison
- Advanced filters UI
