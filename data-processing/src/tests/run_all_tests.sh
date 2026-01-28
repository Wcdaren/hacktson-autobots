#!/bin/bash
# Run all test scripts in the tests folder

# Activate virtual environment
source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate

# Change to src directory
cd "$(dirname "$0")/.."

echo "========================================================================"
echo "Running All Tests (Integration + Unit)"
echo "========================================================================"
echo ""

# Track test results
PASSED=0
FAILED=0

# Function to run a test
run_test() {
    local test_name=$1
    local test_file=$2
    
    echo "------------------------------------------------------------------------"
    echo "Running: $test_name"
    echo "------------------------------------------------------------------------"
    
    if python "$test_file"; then
        echo "✓ PASSED: $test_name"
        ((PASSED++))
    else
        echo "✗ FAILED: $test_name"
        ((FAILED++))
    fi
    echo ""
}

echo "========================================================================"
echo "INTEGRATION TESTS (AWS Connectivity & Environment)"
echo "========================================================================"
echo ""

# Run integration tests
run_test "Environment Loading" "tests/test_env_loading.py"
run_test "AWS Credentials" "tests/test_aws_credentials.py"
run_test "Region Configuration" "tests/test_region_config.py"
run_test "Notebook Credentials" "tests/test_notebook_credentials.py"
run_test "Bedrock Models Check" "tests/check_bedrock_models.py"
run_test "AWS Connectivity" "tests/aws_connectivity_test.py"

echo "========================================================================"
echo "UNIT TESTS (Business Logic)"
echo "========================================================================"
echo ""

# Run unit tests
if python -m unittest discover -s tests/unit -p "test_*.py" -v; then
    echo "✓ PASSED: Unit Tests"
    ((PASSED++))
else
    echo "✗ FAILED: Unit Tests"
    ((FAILED++))
fi
echo ""

# Summary
echo "========================================================================"
echo "Test Summary"
echo "========================================================================"
echo "Integration Tests: 6"
echo "Unit Tests: 13"
echo "Total Passed: $PASSED"
echo "Total Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "✅ All tests passed!"
    exit 0
else
    echo "❌ Some tests failed"
    exit 1
fi
