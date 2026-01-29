# UI Guide: Running and Testing the Semantic Search Demo

## Overview

This guide covers how to run the Streamlit UI, test its functionality, and troubleshoot common issues.

---

## Prerequisites

### 1. Environment Setup
Ensure you have the virtual environment activated:
```bash
source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate
```

### 2. Required Dependencies
Install Streamlit if not already installed:
```bash
pip install streamlit pillow
```

### 3. Environment Variables
Ensure `.env` file exists in `src/` directory with:
```
OPENSEARCH_USERNAME=your_username
OPENSEARCH_PASSWORD=your_password
SSH_KEY_PATH=~/.ssh/id_rsa
```

### 4. SSH Access
Verify SSH key exists and has correct permissions:
```bash
ls -la ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
```

---

## Running the UI

### Step 1: Navigate to Source Directory
```bash
cd src
```

### Step 2: Start Streamlit App
```bash
streamlit run ui/app.py
```

### Step 3: Access the UI
The app will automatically open in your browser at:
```
http://localhost:8501
```

If it doesn't open automatically, manually navigate to the URL shown in the terminal.

---

## Testing the UI

### Test 1: Text Search

#### Basic Queries
1. Enter: `grey sofa under $1000`
   - **Expected**: Products matching grey sofas with price filters
   - **Check**: Results display, price filtering works

2. Enter: `walnut dining table between $500 and $1500`
   - **Expected**: Walnut tables in price range
   - **Check**: Material and price filters applied

3. Enter: `modern minimalist oak bed frame`
   - **Expected**: Oak beds with modern style
   - **Check**: Style and material filters work

#### Complex Queries
4. Enter: `leather sectional sofa under $3000`
   - **Expected**: Leather sectional sofas filtered by price
   - **Check**: Multiple filters applied correctly

5. Enter: `cozy reading chair for small spaces`
   - **Expected**: Comfortable chairs (may trigger LLM fallback)
   - **Check**: Results are relevant despite abstract terms

#### Edge Cases
6. Enter: `` (empty query)
   - **Expected**: Error message "empty search query"
   - **Check**: Graceful error handling

7. Enter: `xyzabc123nonsense`
   - **Expected**: No results or low-quality results
   - **Check**: "No products found" message

### Test 2: Image Search

#### Test with Sample Images
1. **Navigate to test images**:
   ```bash
   # Sample images are in:
   data/active_only/image_base64/batch1/
   ```

2. **Upload a furniture image**:
   - Click "Browse files" in Image Search tab
   - Select any furniture image (JPG/PNG)
   - Click "Find Similar Products"
   - **Expected**: Visually similar products displayed
   - **Check**: Similarity scores are reasonable (>0.4)

3. **Test with non-furniture image**:
   - Upload a random image (not furniture)
   - **Expected**: Low similarity scores or no results
   - **Check**: System handles gracefully

#### Edge Cases
4. **Upload very large image** (>5MB):
   - **Expected**: May take longer but should work
   - **Check**: Loading indicator shows, no timeout

5. **Upload invalid file**:
   - Try uploading a .txt or .pdf file
   - **Expected**: File uploader rejects it
   - **Check**: Only JPG/PNG accepted

---

## Verifying Logs

### Check Log Files
```bash
# Navigate to logs directory
cd src/unit_4_search_query/logs/

# List log files
ls -la ui_search_logs_*.json

# View latest log file
cat ui_search_logs_$(date +%Y%m%d_%H).json | jq .
```

### Expected Log Structure
```json
[
  {
    "timestamp": "2026-01-29T19:15:30.123456",
    "search_type": "text",
    "query": "grey sofa under $1000",
    "status": "success",
    "total_results": 50,
    "response_time_ms": 850,
    "search_mode": "hybrid",
    "filters_applied": {
      "price_max": 1000.0,
      "colors": ["Grey"],
      "categories": ["Sofa"]
    },
    "llm_fallback_used": false,
    "enhanced_query": null,
    "top_3_results": [...]
  }
]
```

### Verify Logging Works
1. Perform a search in the UI
2. Check that a new log entry appears in the current hour's log file
3. Verify all fields are populated correctly

---

## Troubleshooting Guide

### Issue 1: SSH Tunnel Connection Failed

**Symptoms:**
- Error: "Failed to start SSH tunnel"
- Error: "Connection refused"

**Solutions:**

1. **Check SSH key exists:**
   ```bash
   ls -la ~/.ssh/id_rsa
   ```
   If missing, contact IT for SSH key setup.

2. **Verify SSH key permissions:**
   ```bash
   chmod 600 ~/.ssh/id_rsa
   ```

3. **Test SSH connection manually:**
   ```bash
   ssh -i ~/.ssh/id_rsa autobots@jumphost-sg.castlery.com
   ```
   If this fails, SSH credentials are incorrect.

4. **Check if tunnel is already running:**
   ```bash
   lsof -i :9200
   ```
   If port 9200 is in use, kill the process:
   ```bash
   kill -9 <PID>
   ```

5. **Update SSH_KEY_PATH in .env:**
   ```bash
   # In src/.env
   SSH_KEY_PATH=/full/path/to/your/ssh/key
   ```

### Issue 2: OpenSearch Connection Failed

**Symptoms:**
- Error: "Connection to OpenSearch failed"
- Error: "Authentication failed"

**Solutions:**

1. **Verify credentials in .env:**
   ```bash
   cat src/.env | grep OPENSEARCH
   ```
   Ensure username and password are correct.

2. **Check tunnel is active:**
   ```bash
   curl -k -u username:password https://127.0.0.1:9200
   ```
   Should return OpenSearch cluster info.

3. **Restart the app:**
   - Stop Streamlit (Ctrl+C)
   - Clear cache: `streamlit cache clear`
   - Restart: `streamlit run ui/app.py`

### Issue 3: No Search Results

**Symptoms:**
- Search returns 0 results for valid queries
- Error: "NO_RESULTS"

**Solutions:**

1. **Check if OpenSearch indices exist:**
   ```bash
   # Test with test_search_functions.py
   cd src
   python test_search_functions.py
   ```
   If this works, UI should work too.

2. **Verify data is indexed:**
   ```bash
   curl -k -u username:password https://127.0.0.1:9200/products-text-index/_count
   ```
   Should return count > 0.

3. **Check search service logs:**
   Look for errors in terminal where Streamlit is running.

4. **Try simpler queries:**
   - Start with: `sofa`
   - Then: `grey sofa`
   - Then: `grey sofa under $1000`
   - Identify where it breaks.

### Issue 4: Image Search Not Working

**Symptoms:**
- Image upload fails
- Error: "INVALID_IMAGE"
- No results for image search

**Solutions:**

1. **Check image format:**
   - Only JPG and PNG supported
   - Convert image if needed:
     ```bash
     convert image.webp image.jpg
     ```

2. **Check image size:**
   - Very large images (>10MB) may cause issues
   - Resize if needed:
     ```bash
     convert image.jpg -resize 1024x1024 image_resized.jpg
     ```

3. **Verify Bedrock access:**
   ```bash
   # Test Bedrock connectivity
   cd src
   python -c "import boto3; client = boto3.client('bedrock-runtime', region_name='us-east-1'); print('Bedrock OK')"
   ```

4. **Check image index exists:**
   ```bash
   curl -k -u username:password https://127.0.0.1:9200/products-image-index/_count
   ```

### Issue 5: Slow Performance

**Symptoms:**
- Searches take >5 seconds
- UI feels sluggish

**Solutions:**

1. **Check network latency:**
   ```bash
   ping jumphost-sg.castlery.com
   ```
   High latency (>100ms) will slow down searches.

2. **Reduce result count:**
   Edit `src/config.yaml`:
   ```yaml
   search_query:
     max_results: 20  # Reduce from 50
   ```

3. **Check system resources:**
   ```bash
   top
   ```
   Ensure CPU/memory not maxed out.

4. **Restart services:**
   - Stop Streamlit
   - Clear cache
   - Restart

### Issue 6: LLM Features Not Working

**Symptoms:**
- Warning: "Claude invocation failed"
- Error: "Access to this model is not available"

**Expected Behavior:**
- This is NORMAL due to AWS account restrictions
- Search will still work without LLM fallback
- Related tags may not generate for some queries

**No Action Needed:**
- System gracefully handles LLM failures
- Core search functionality unaffected

### Issue 7: Logs Not Being Created

**Symptoms:**
- No log files in `src/unit_4_search_query/logs/`
- Searches work but not logged

**Solutions:**

1. **Check directory exists:**
   ```bash
   mkdir -p src/unit_4_search_query/logs
   ```

2. **Check write permissions:**
   ```bash
   ls -la src/unit_4_search_query/
   chmod 755 src/unit_4_search_query/logs
   ```

3. **Check logger initialization:**
   Look for "Logged text search" messages in terminal.

4. **Manually test logger:**
   ```python
   from ui.utils.logger import SearchLogger
   logger = SearchLogger()
   logger.log_search('text', 'test', {'status': 'success', 'results': []})
   ```

### Issue 8: Streamlit Won't Start

**Symptoms:**
- Error: "streamlit: command not found"
- Error: "ModuleNotFoundError: No module named 'streamlit'"

**Solutions:**

1. **Verify virtual environment is activated:**
   ```bash
   which python
   # Should show: /Users/.../semantic-search/bin/python
   ```

2. **Install Streamlit:**
   ```bash
   pip install streamlit
   ```

3. **Check Python version:**
   ```bash
   python --version
   # Should be 3.9+
   ```

4. **Reinstall dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

---

## Performance Benchmarks

### Expected Response Times
| Search Type | Expected Time | Acceptable Range |
|-------------|---------------|------------------|
| Text Search (simple) | 500-800ms | 300ms - 1.5s |
| Text Search (complex) | 800-1200ms | 500ms - 2s |
| Image Search | 1000-1500ms | 800ms - 3s |
| LLM Fallback (if triggered) | +1000-2000ms | +500ms - 3s |

### If Performance is Outside Range
1. Check network latency to AWS
2. Verify OpenSearch cluster health
3. Check system resources (CPU, memory)
4. Consider reducing `max_results` in config

---

## Quick Reference Commands

### Start UI
```bash
cd src
streamlit run ui/app.py
```

### Stop UI
```
Ctrl + C in terminal
```

### Clear Streamlit Cache
```bash
streamlit cache clear
```

### View Logs
```bash
tail -f src/unit_4_search_query/logs/ui_search_logs_$(date +%Y%m%d_%H).json
```

### Test Backend Directly
```bash
cd src
python test_search_functions.py
```

### Check SSH Tunnel
```bash
lsof -i :9200
```

### Test OpenSearch
```bash
curl -k -u username:password https://127.0.0.1:9200/_cluster/health
```

---

## Getting Help

### Debug Mode
Run Streamlit with debug logging:
```bash
streamlit run ui/app.py --logger.level=debug
```

### Check All Logs
```bash
# Streamlit logs
cat ~/.streamlit/logs/streamlit.log

# Application logs
# (shown in terminal where Streamlit is running)

# Search logs
cat src/unit_4_search_query/logs/ui_search_logs_*.json
```

### Report Issues
When reporting issues, include:
1. Error message (full stack trace)
2. Query that caused the issue
3. Log file entries
4. Output of `python test_search_functions.py`
5. System info: `python --version`, `streamlit version`

---

## Success Checklist

Before demo, verify:
- [ ] SSH tunnel connects successfully
- [ ] Text search returns results
- [ ] Image search returns results
- [ ] Logs are being created
- [ ] UI loads without errors
- [ ] Product images display correctly
- [ ] Product links work
- [ ] Error messages are user-friendly
- [ ] Performance is acceptable (<3s per search)

---

## Next Steps

Once UI is working:
1. Test with various queries from `test_search_functions.py`
2. Prepare demo queries that showcase best results
3. Take screenshots for documentation
4. Consider adding Related Tags feature (Feature 6)
