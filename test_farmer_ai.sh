#!/bin/bash

# Farmer AI API Test Suite
# Tests all the farmer AI endpoints to ensure they're working correctly

BASE_URL="http://localhost:3001"
PASSED=0
FAILED=0

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌾 Starting Farmer AI API Test Suite${NC}"
echo "========================================="

# Test function
test_endpoint() {
    local name="$1"
    local url="$2"
    local method="${3:-GET}"
    local data="$4"
    
    echo -n "Testing $name... "
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL$url")
    else
        response=$(curl -s "$BASE_URL$url")
    fi
    
    if echo "$response" | grep -q '"success":true\|"message"'; then
        echo -e "${GREEN}✅ PASSED${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAILED${NC}"
        echo "Response: $response"
        ((FAILED++))
    fi
}

# Test main welcome page
test_endpoint "Main Welcome Page" "/"

# Test farmer AI endpoints
echo -e "\n${BLUE}Testing Farmer AI Endpoints:${NC}"

test_endpoint "Crop Recommendations (Maharashtra)" "/farmer-ai/crop-recommendations?state=Maharashtra&season=Kharif"

test_endpoint "Crop Recommendations (Punjab)" "/farmer-ai/crop-recommendations?state=Punjab&season=Kharif"

test_endpoint "Weather Advisory" "/farmer-ai/weather-advisory?state=Punjab&district=Ludhiana"

test_endpoint "Government Schemes" "/farmer-ai/government-schemes"

test_endpoint "Market Prices (All)" "/farmer-ai/market-prices"

test_endpoint "Market Prices (Rice)" "/farmer-ai/market-prices?crop=Rice"

test_endpoint "Soil Health" "/farmer-ai/soil-health?soilType=Black%20Cotton%20Soil&cropType=Cotton"

test_endpoint "Water Management" "/farmer-ai/water-management?irrigationType=Drip&cropType=Cotton"

# Test AI Assistant with different queries
echo -e "\n${BLUE}Testing AI Farming Assistant:${NC}"

test_endpoint "AI Assistant (Crop Query)" "/farmer-ai/farming-assistant" "POST" '{"query": "What crops should I grow?"}'

test_endpoint "AI Assistant (Weather Query)" "/farmer-ai/farming-assistant" "POST" '{"query": "weather advice for farming"}'

test_endpoint "AI Assistant (Market Query)" "/farmer-ai/farming-assistant" "POST" '{"query": "market prices for cotton"}'

test_endpoint "AI Assistant (Soil Query)" "/farmer-ai/farming-assistant" "POST" '{"query": "soil health tips"}'

test_endpoint "AI Assistant (Water Query)" "/farmer-ai/farming-assistant" "POST" '{"query": "water management for crops"}'

test_endpoint "AI Assistant (General Query)" "/farmer-ai/farming-assistant" "POST" '{"query": "help me with farming"}'

# Test edge cases
echo -e "\n${BLUE}Testing Edge Cases:${NC}"

test_endpoint "Invalid State" "/farmer-ai/crop-recommendations?state=InvalidState&season=Kharif"

test_endpoint "Missing Parameters" "/farmer-ai/crop-recommendations"

test_endpoint "Empty AI Query" "/farmer-ai/farming-assistant" "POST" '{}'

# Summary
echo -e "\n========================================="
echo -e "${BLUE}Test Summary:${NC}"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"

if [ $FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All tests passed! Farmer AI platform is working correctly.${NC}"
    exit 0
else
    echo -e "\n${RED}⚠️  Some tests failed. Please check the failing endpoints.${NC}"
    exit 1
fi