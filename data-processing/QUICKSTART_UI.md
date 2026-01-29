# Quick Start: Castlery Semantic Search UI

## 🚀 Start the UI (3 Steps)

```bash
# 1. Activate virtual environment
source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate

# 2. Go to src directory
cd src

# 3. Run the UI
./start_ui.sh
```

**That's it!** The UI will open in your browser at `http://localhost:8501`

---

## 🔍 Try These Searches

### Text Search
- `grey leather sofa under $2000`
- `walnut dining table between $500 and $1500`
- `modern minimalist oak bed frame`
- `cozy reading chair for small spaces`

### Image Search
1. Click "Image Search" tab
2. Upload any furniture image
3. Click "Find Similar Products"

---

## 📊 Check Logs

```bash
# View today's logs
cat src/unit_4_search_query/logs/ui_search_logs_$(date +%Y%m%d_%H).json | jq .
```

---

## ❌ Something Wrong?

### UI won't start?
```bash
pip install streamlit pillow
streamlit cache clear
```

### SSH tunnel fails?
```bash
chmod 600 ~/.ssh/id_rsa
```

### No results?
```bash
# Test backend first
python test_search_functions.py
```

**Full troubleshooting guide**: `docs/UI_GUIDE.md`

---

## 📚 Documentation

- **Comprehensive Guide**: `docs/UI_GUIDE.md` (testing, troubleshooting, benchmarks)
- **Implementation Summary**: `docs/UI_IMPLEMENTATION_SUMMARY.md` (what was built)
- **Development Spec**: `docs/ui_engine_prompt.md` (original requirements)

---

## ✅ Success Checklist

Before demo:
- [ ] UI starts without errors
- [ ] Text search returns results
- [ ] Image search works
- [ ] Logs are being created
- [ ] Performance is good (<3s)

---

**Need help?** See `docs/UI_GUIDE.md` for detailed instructions.
