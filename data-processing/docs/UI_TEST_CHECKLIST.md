# UI Test Checklist

Use this checklist to verify the UI is working correctly before demo.

---

## Pre-Flight Checks

### Environment
- [ ] Virtual environment activated
  ```bash
  source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate
  ```
- [ ] In correct directory (`src/`)
- [ ] `.env` file exists with credentials
- [ ] SSH key exists at `~/.ssh/id_rsa`

### Dependencies
- [ ] Streamlit installed: `streamlit --version`
- [ ] All packages installed: `pip list | grep -E "streamlit|opensearch|boto3|sshtunnel"`

---

## Startup Tests

### 1. Start UI
```bash
cd src
./start_ui.sh
```

**Expected**:
- [ ] ✓ Virtual environment check passes
- [ ] ✓ Environment file found
- [ ] ✓ SSH key found
- [ ] ✓ Streamlit installed
- [ ] ✓ "Starting UI..." message
- [ ] ✓ Browser opens to `http://localhost:8501`

**If fails**: See `docs/UI_GUIDE.md` → "Issue 8: Streamlit Won't Start"

### 2. UI Loads
**Expected**:
- [ ] "CASTLERY" header visible
- [ ] "Semantic Search Demo" subtitle visible
- [ ] Two tabs: "Text Search" and "Image Search"
- [ ] Search input box visible
- [ ] No error messages in UI
- [ ] No errors in terminal

**If fails**: Check terminal for error messages

---

## Text Search Tests

### Test 1: Simple Query
**Query**: `sofa`

**Steps**:
1. [ ] Enter "sofa" in search box
2. [ ] Click "Search" button
3. [ ] Wait for results

**Expected**:
- [ ] Loading spinner appears
- [ ] Results appear within 2 seconds
- [ ] "X results found (Yms)" message shows
- [ ] Product grid displays (4 columns)
- [ ] Each card shows: image, name, price, category
- [ ] No error messages

**If fails**: See `docs/UI_GUIDE.md` → "Issue 3: No Search Results"

### Test 2: Query with Filters
**Query**: `grey leather sofa under $2000`

**Steps**:
1. [ ] Enter query in search box
2. [ ] Click "Search"
3. [ ] Wait for results

**Expected**:
- [ ] Results appear within 2 seconds
- [ ] Products are grey/leather sofas
- [ ] Prices are under $2000
- [ ] At least 10 results shown

**If fails**: Check if filters are being extracted (check logs)

### Test 3: Complex Query
**Query**: `walnut dining table between $500 and $1500`

**Expected**:
- [ ] Results are walnut dining tables
- [ ] Prices are in range $500-$1500
- [ ] Response time <2 seconds

### Test 4: Abstract Query
**Query**: `cozy reading chair for small spaces`

**Expected**:
- [ ] Results appear (may take 2-3 seconds)
- [ ] Results are chairs
- [ ] May see "Claude invocation failed" in terminal (OK, expected)
- [ ] Search still completes successfully

### Test 5: Empty Query
**Query**: `` (leave empty)

**Expected**:
- [ ] Error message appears
- [ ] Message says "empty search query" or similar
- [ ] No crash

### Test 6: Nonsense Query
**Query**: `xyzabc123nonsense`

**Expected**:
- [ ] Either no results or low-quality results
- [ ] "No products found" message OR results with low scores
- [ ] No crash

---

## Image Search Tests

### Test 1: Upload Valid Image
**Steps**:
1. [ ] Click "Image Search" tab
2. [ ] Click "Browse files"
3. [ ] Select a furniture image (JPG/PNG)
4. [ ] Image preview appears
5. [ ] Click "Find Similar Products"

**Expected**:
- [ ] Loading spinner appears
- [ ] Results appear within 3 seconds
- [ ] "X similar products found" message
- [ ] Products are visually similar
- [ ] Similarity scores >0.4

**If fails**: See `docs/UI_GUIDE.md` → "Issue 4: Image Search Not Working"

### Test 2: Upload Large Image
**Steps**:
1. [ ] Upload image >2MB
2. [ ] Click "Find Similar Products"

**Expected**:
- [ ] May take 3-5 seconds
- [ ] Still completes successfully
- [ ] Results appear

### Test 3: Invalid File Type
**Steps**:
1. [ ] Try to upload .txt or .pdf file

**Expected**:
- [ ] File uploader rejects it
- [ ] Only JPG/PNG accepted

---

## Logging Tests

### Test 1: Log File Created
**Steps**:
1. [ ] Perform any search
2. [ ] Check logs directory:
   ```bash
   ls -la src/unit_4_search_query/logs/
   ```

**Expected**:
- [ ] File exists: `ui_search_logs_YYYYMMDD_HH.json`
- [ ] File is not empty

**If fails**: See `docs/UI_GUIDE.md` → "Issue 7: Logs Not Being Created"

### Test 2: Log Content
**Steps**:
1. [ ] View log file:
   ```bash
   cat src/unit_4_search_query/logs/ui_search_logs_$(date +%Y%m%d_%H).json | jq .
   ```

**Expected**:
- [ ] JSON is valid
- [ ] Contains search entries
- [ ] Each entry has: timestamp, search_type, query, status, total_results
- [ ] Metadata fields populated

### Test 3: Error Logging
**Steps**:
1. [ ] Perform search that causes error (e.g., empty query)
2. [ ] Check log file

**Expected**:
- [ ] Error entry in log
- [ ] Status: "error"
- [ ] Error message included

---

## Performance Tests

### Test 1: Response Time
**Steps**:
1. [ ] Perform 5 different text searches
2. [ ] Note response time for each

**Expected**:
- [ ] First search: 1-3 seconds (cold start)
- [ ] Subsequent searches: 0.5-1.5 seconds
- [ ] Average <2 seconds

**If fails**: See `docs/UI_GUIDE.md` → "Issue 5: Slow Performance"

### Test 2: Multiple Searches
**Steps**:
1. [ ] Perform 10 searches in a row
2. [ ] Check UI responsiveness

**Expected**:
- [ ] UI remains responsive
- [ ] No memory leaks
- [ ] No slowdown over time

---

## UI/UX Tests

### Test 1: Styling
**Expected**:
- [ ] Background is off-white (#FAFAFA)
- [ ] Text is black (#000000)
- [ ] Product cards have subtle borders
- [ ] Cards have hover effect (shadow)
- [ ] Search button is black with white text
- [ ] Overall look is clean and minimalist

### Test 2: Responsiveness
**Steps**:
1. [ ] Resize browser window
2. [ ] Check layout at different widths

**Expected**:
- [ ] Grid adjusts to window size
- [ ] No horizontal scrolling
- [ ] Text remains readable

### Test 3: Links
**Steps**:
1. [ ] Click "View Product →" link on any result

**Expected**:
- [ ] Opens in new tab
- [ ] Goes to correct product page (if URL valid)

---

## Error Handling Tests

### Test 1: SSH Tunnel Failure
**Steps**:
1. [ ] Stop any running UI
2. [ ] Rename SSH key temporarily
3. [ ] Try to start UI

**Expected**:
- [ ] Error message about SSH key
- [ ] UI doesn't crash
- [ ] Clear error message

### Test 2: OpenSearch Connection Failure
**Steps**:
1. [ ] Stop SSH tunnel manually
2. [ ] Try to search

**Expected**:
- [ ] Error message appears
- [ ] UI doesn't crash
- [ ] Error is logged

### Test 3: Network Timeout
**Steps**:
1. [ ] Disconnect from network
2. [ ] Try to search

**Expected**:
- [ ] Timeout error after reasonable time
- [ ] Error message to user
- [ ] UI remains functional

---

## Final Checks

### Before Demo
- [ ] UI starts cleanly
- [ ] Text search works
- [ ] Image search works
- [ ] Logs are being created
- [ ] Performance is good (<3s)
- [ ] No errors in terminal
- [ ] UI looks professional
- [ ] Have demo queries ready

### Demo Queries (Tested and Working)
- [ ] `grey leather sofa under $2000`
- [ ] `walnut dining table between $500 and $1500`
- [ ] `modern minimalist oak bed frame`
- [ ] Have 1-2 sample images ready

### Backup Plan
- [ ] Know how to restart UI quickly
- [ ] Have `test_search_functions.py` as backup
- [ ] Know common troubleshooting steps

---

## Test Results Summary

**Date**: _______________
**Tester**: _______________

| Category | Pass | Fail | Notes |
|----------|------|------|-------|
| Pre-Flight Checks | ☐ | ☐ | |
| Startup Tests | ☐ | ☐ | |
| Text Search Tests | ☐ | ☐ | |
| Image Search Tests | ☐ | ☐ | |
| Logging Tests | ☐ | ☐ | |
| Performance Tests | ☐ | ☐ | |
| UI/UX Tests | ☐ | ☐ | |
| Error Handling Tests | ☐ | ☐ | |

**Overall Status**: ☐ Ready for Demo  ☐ Needs Work

**Issues Found**:
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

**Action Items**:
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

---

## Quick Troubleshooting

If any test fails, try these in order:

1. **Restart UI**
   ```bash
   # Stop: Ctrl+C
   streamlit cache clear
   ./start_ui.sh
   ```

2. **Check Backend**
   ```bash
   python test_search_functions.py
   ```

3. **Check SSH Tunnel**
   ```bash
   lsof -i :9200
   ```

4. **Check Logs**
   ```bash
   tail -f src/unit_4_search_query/logs/ui_search_logs_$(date +%Y%m%d_%H).json
   ```

5. **Full Troubleshooting**
   See `docs/UI_GUIDE.md`

---

**All tests passing?** 🎉 You're ready for demo!
