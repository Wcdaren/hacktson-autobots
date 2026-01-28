#!/bin/bash
# Run all unit tests

# Activate virtual environment
source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate

# Change to src directory
cd "$(dirname "$0")/../.."

echo "========================================================================"
echo "Running Unit Tests"
echo "========================================================================"
echo ""

# Run unit tests with unittest discovery
python -m unittest discover -s tests/unit -p "test_*.py" -v

exit_code=$?

echo ""
echo "========================================================================"
if [ $exit_code -eq 0 ]; then
    echo "✅ All unit tests passed!"
else
    echo "❌ Some unit tests failed"
fi
echo "========================================================================"

exit $exit_code
