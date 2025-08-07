#!/bin/bash

# Farmer AI Platform Demo Script
# Demonstrates the complete AI-powered farmer assistance capabilities

BASE_URL="http://localhost:3001"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

clear
echo -e "${BLUE}🚜🌾 INDIAN FARMER AI ASSISTANT PLATFORM DEMO 🌾🚜${NC}"
echo "================================================================"
echo ""

# Function to display JSON response in a formatted way
show_response() {
    echo -e "${CYAN}Response:${NC}"
    echo "$1" | python -m json.tool 2>/dev/null || echo "$1"
    echo ""
}

# Function to pause for user interaction
pause() {
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read -r
}

echo -e "${GREEN}🏠 Welcome to the Indian Farmer AI Assistant Platform${NC}"
echo "This demo will showcase AI-powered features designed specifically for Indian farmers."
echo ""
pause

# Demo 1: Main Platform Overview
echo -e "${BLUE}📋 DEMO 1: Platform Overview${NC}"
echo "Let's start by exploring what this platform offers..."
echo ""
response=$(curl -s "$BASE_URL/")
show_response "$response"
pause

# Demo 2: Crop Recommendations for Maharashtra
echo -e "${BLUE}🌱 DEMO 2: Crop Recommendations for Maharashtra (Kharif Season)${NC}"
echo "A farmer in Maharashtra wants to know which crops to grow during Kharif season..."
echo ""
response=$(curl -s "$BASE_URL/farmer-ai/crop-recommendations?state=Maharashtra&season=Kharif")
show_response "$response"
pause

# Demo 3: Crop Recommendations for Punjab
echo -e "${BLUE}🌾 DEMO 3: Crop Recommendations for Punjab (Kharif Season)${NC}"
echo "Now let's see recommendations for Punjab farmers during Kharif season..."
echo ""
response=$(curl -s "$BASE_URL/farmer-ai/crop-recommendations?state=Punjab&season=Kharif")
show_response "$response"
pause

# Demo 4: AI Farming Assistant
echo -e "${BLUE}🤖 DEMO 4: AI-Powered Farming Assistant${NC}"
echo "Let's interact with our AI assistant using natural language queries..."
echo ""

queries=(
    "What crops should I grow in Tamil Nadu during Rabi season?"
    "How can I improve my soil health?"
    "Tell me about water management for cotton farming"
    "What government schemes are available for farmers?"
    "Current market prices for rice"
)

for query in "${queries[@]}"; do
    echo -e "${YELLOW}Farmer asks: \"$query\"${NC}"
    response=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"query\": \"$query\"}" "$BASE_URL/farmer-ai/farming-assistant")
    show_response "$response"
    sleep 2
done
pause

# Demo 5: Weather Advisory
echo -e "${BLUE}🌦️ DEMO 5: Weather-Based Agricultural Advisory${NC}"
echo "Getting weather-based farming advice for Ludhiana, Punjab..."
echo ""
response=$(curl -s "$BASE_URL/farmer-ai/weather-advisory?state=Punjab&district=Ludhiana")
show_response "$response"
pause

# Demo 6: Government Schemes
echo -e "${BLUE}🏛️ DEMO 6: Government Schemes for Farmers${NC}"
echo "Comprehensive information about government agricultural schemes..."
echo ""
response=$(curl -s "$BASE_URL/farmer-ai/government-schemes")
show_response "$response"
pause

# Demo 7: Market Price Intelligence
echo -e "${BLUE}💰 DEMO 7: Market Price Intelligence${NC}"
echo "Current market prices and trends for Rice..."
echo ""
response=$(curl -s "$BASE_URL/farmer-ai/market-prices?crop=Rice")
show_response "$response"
pause

echo "And market prices for all major crops..."
echo ""
response=$(curl -s "$BASE_URL/farmer-ai/market-prices")
show_response "$response"
pause

# Demo 8: Soil Health Assessment
echo -e "${BLUE}🌱 DEMO 8: Soil Health Assessment${NC}"
echo "Soil health recommendations for Black Cotton Soil used for Cotton farming..."
echo ""
response=$(curl -s "$BASE_URL/farmer-ai/soil-health?soilType=Black%20Cotton%20Soil&cropType=Cotton&state=Maharashtra")
show_response "$response"
pause

# Demo 9: Water Management
echo -e "${BLUE}💧 DEMO 9: Water Management & Irrigation Guidance${NC}"
echo "Water management recommendations for drip irrigation in cotton farming..."
echo ""
response=$(curl -s "$BASE_URL/farmer-ai/water-management?irrigationType=Drip&cropType=Cotton&season=Kharif")
show_response "$response"
pause

# Demo 10: Multi-state Comparison
echo -e "${BLUE}🗺️ DEMO 10: Multi-State Crop Comparison${NC}"
echo "Comparing Rabi season recommendations across different states..."
echo ""

states=("Maharashtra" "Punjab" "Tamil Nadu")
for state in "${states[@]}"; do
    echo -e "${YELLOW}Rabi season crops for $state:${NC}"
    response=$(curl -s "$BASE_URL/farmer-ai/crop-recommendations?state=$state&season=Rabi")
    if echo "$response" | grep -q '"success":true'; then
        show_response "$response"
    else
        echo "No specific Rabi data for $state in our demo dataset."
        echo ""
    fi
    sleep 1
done
pause

# Demo Summary
echo -e "${GREEN}🎉 DEMO COMPLETE: Summary of Features${NC}"
echo "================================================================"
echo ""
echo -e "${CYAN}✅ Features Demonstrated:${NC}"
echo "1. 🌱 Crop Recommendations (State & Season specific)"
echo "2. 🤖 AI Farming Assistant (Natural Language Processing)"
echo "3. 🌦️ Weather-based Agricultural Advisory"
echo "4. 🏛️ Government Schemes Database"
echo "5. 💰 Market Price Intelligence & Trends"
echo "6. 🌱 Soil Health Assessment & Recommendations"
echo "7. 💧 Water Management & Irrigation Guidance"
echo "8. 🗺️ Multi-state Agricultural Support"
echo ""
echo -e "${CYAN}🌾 Supported Indian States:${NC}"
echo "Maharashtra, Punjab, Tamil Nadu, Karnataka, Gujarat, Uttar Pradesh, Rajasthan, Madhya Pradesh, West Bengal"
echo ""
echo -e "${CYAN}🗣️ Language Support Ready:${NC}"
echo "Hindi, English, Telugu, Tamil, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese"
echo ""
echo -e "${CYAN}📞 Farmer Support:${NC}"
echo "Helpline: 1800-180-1551"
echo "PM-KISAN Support: 155261"
echo ""
echo -e "${GREEN}🚜 This AI platform is designed to empower Indian farmers with technology! 🚜${NC}"
echo ""
echo -e "${YELLOW}Thank you for watching the demo! The platform is ready to help farmers across India.${NC}"