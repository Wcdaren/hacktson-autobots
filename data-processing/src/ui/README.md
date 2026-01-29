# Castlery Semantic Search UI

Simple Streamlit-based demo interface for the semantic search engine.

## Quick Start

```bash
# 1. Activate virtual environment
source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate

# 2. Navigate to src directory
cd src

# 3. Run the startup script
./start_ui.sh
```

Or manually:
```bash
cd src
streamlit run ui/app.py
```

## Features

- **Text Search**: Natural language queries with smart filter extraction
- **Image Search**: Upload furniture images to find similar products
- **Automatic Logging**: All searches logged to hourly JSON files
- **Castlery Branding**: Clean, minimalist UI matching Castlery's design

## File Structure

```
ui/
├── app.py              # Main Streamlit application
├── utils/
│   ├── tunnel.py       # SSH tunnel management
│   └── logger.py       # Search logging utility
└── README.md           # This file
```

## Requirements

- Python 3.9+
- Streamlit
- SSH access to jumphost-sg.castlery.com
- OpenSearch credentials in .env file

## Troubleshooting

See [docs/UI_GUIDE.md](../../docs/UI_GUIDE.md) for detailed troubleshooting guide.

### Common Issues

1. **SSH tunnel fails**: Check SSH key path and permissions
2. **No results**: Verify OpenSearch indices exist
3. **Slow performance**: Check network latency

## Logs

Search logs are saved to:
```
src/unit_4_search_query/logs/ui_search_logs_YYYYMMDD_HH.json
```

Each log entry includes:
- Query text
- Search type (text/image)
- Results count
- Response time
- Filters applied
- Top 3 results
