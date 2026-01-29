#!/bin/bash

# Startup script for Castlery Semantic Search UI

echo "=========================================="
echo "Castlery Semantic Search UI"
echo "=========================================="
echo ""

# Check if virtual environment is activated
if [[ "$VIRTUAL_ENV" == "" ]]; then
    echo "⚠️  Virtual environment not activated!"
    echo "Please run:"
    echo "  source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate"
    echo ""
    exit 1
fi

echo "✓ Virtual environment: $VIRTUAL_ENV"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "Please create .env file with:"
    echo "  OPENSEARCH_USERNAME=your_username"
    echo "  OPENSEARCH_PASSWORD=your_password"
    echo "  SSH_KEY_PATH=~/.ssh/id_rsa"
    echo ""
    exit 1
fi

echo "✓ Environment file found"

# Load SSH_KEY_PATH from .env
SSH_KEY_PATH=$(grep "^SSH_KEY_PATH=" .env | cut -d '=' -f2-)
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/.ssh/id_rsa}"

# Check if SSH key exists
if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "⚠️  SSH key not found at: $SSH_KEY_PATH"
    echo "Please check SSH_KEY_PATH in .env"
    echo ""
    exit 1
fi

echo "✓ SSH key found at: $SSH_KEY_PATH"

# Check if streamlit is installed
if ! command -v streamlit &> /dev/null; then
    echo "⚠️  Streamlit not installed!"
    echo "Installing streamlit..."
    pip install streamlit pillow
fi

echo "✓ Streamlit installed"
echo ""
echo "Starting UI..."
echo "=========================================="
echo ""

# Start Streamlit
streamlit run ui/app.py
