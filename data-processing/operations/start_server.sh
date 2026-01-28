#!/bin/bash

# Simple script to start the Semantic Search API server on EC2
# Usage: ./start_server.sh [port]

set -e

# Default port
PORT=${1:-5000}

echo "=========================================="
echo "Semantic Search API - Starting Server"
echo "=========================================="
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "   Run: python3 -m venv venv"
    echo "   Then: source venv/bin/activate"
    echo "   Then: pip install -r requirements.txt"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "   Run: cp .env.example .env"
    echo "   Then edit .env with your credentials"
    exit 1
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Check if dependencies are installed
if ! python -c "import flask" 2>/dev/null; then
    echo "❌ Flask not installed!"
    echo "   Run: pip install -r requirements.txt"
    exit 1
fi

echo "✓ Virtual environment activated"
echo "✓ Dependencies installed"
echo ""

# Test environment variables
echo "Testing environment configuration..."
python test_env_loading.py
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Environment configuration failed!"
    echo "   Check your .env file and try again"
    exit 1
fi

echo ""
echo "=========================================="
echo "Starting API server on port $PORT..."
echo "=========================================="
echo ""

# Start server
python app.py --host 0.0.0.0 --port $PORT
