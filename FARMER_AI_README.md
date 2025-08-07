# Indian Farmer AI Assistant Platform

## Overview

This platform provides AI-powered agricultural guidance specifically designed for Indian farmers. It extends the existing Node.js MongoDB application with comprehensive farming assistance features.

## 🌾 Features for Indian Farmers

### 1. **Crop Recommendation System**
- State-wise and season-wise crop suggestions
- Supports major agricultural states: Maharashtra, Punjab, Tamil Nadu, Karnataka, Gujarat
- Considers soil type, irrigation availability, and local conditions
- Includes market price information and government scheme details

### 2. **Weather-based Agricultural Advisory**
- Location-specific weather guidance
- Seasonal farming recommendations
- Pest and disease alerts based on weather conditions
- Optimal timing for farming operations

### 3. **Government Schemes Information**
- Complete database of government agricultural schemes
- PM-KISAN, PMFBY, Soil Health Card, PMKSY details
- Eligibility criteria and application procedures
- Direct links to official government portals

### 4. **Market Price Intelligence**
- Real-time market prices for major crops
- Price trend analysis and predictions
- Factors affecting market rates
- Recommendations for optimal selling times

### 5. **Soil Health Management**
- Soil assessment and health recommendations
- Nutrient analysis and fertilizer suggestions
- Organic farming guidance
- Soil improvement techniques

### 6. **Water Management & Irrigation**
- Irrigation scheduling recommendations
- Water conservation techniques
- Drip irrigation and sprinkler guidance
- Rainwater harvesting suggestions

### 7. **AI-Powered Farming Assistant**
- Natural language processing for farming queries
- Keyword-based intelligent responses
- Multi-topic guidance in conversational format
- Support for farming-related questions in multiple languages

## 🛠 API Endpoints

### Base URL: `http://localhost:3001`

#### Main Welcome Page
```
GET /
```
Returns platform overview and available features.

#### Farmer Profile Management
```
POST /farmer-ai/farmer-profile
```
Create a farmer profile with personal and farm details.

**Request Body:**
```json
{
  "userId": "user_id_here",
  "name": "Farmer Name",
  "phone": "9876543210",
  "state": "Maharashtra",
  "district": "Pune",
  "farmSize": 5.5,
  "soilType": "Black Cotton Soil",
  "irrigationType": "Drip Irrigation",
  "language": "Hindi"
}
```

#### Crop Recommendations
```
GET /farmer-ai/crop-recommendations?state=Maharashtra&season=Kharif&soilType=Black%20Cotton%20Soil
```

**Parameters:**
- `state` (required): Indian state name
- `season` (required): Kharif, Rabi, Zaid, or Perennial
- `soilType` (optional): Type of soil

#### AI Farming Assistant
```
POST /farmer-ai/farming-assistant
```

**Request Body:**
```json
{
  "query": "What crops should I grow in Punjab during Kharif season?",
  "farmerId": "optional_farmer_id"
}
```

#### Weather Advisory
```
GET /farmer-ai/weather-advisory?state=Punjab&district=Ludhiana
```

#### Government Schemes
```
GET /farmer-ai/government-schemes?category=insurance
```

#### Market Prices
```
GET /farmer-ai/market-prices?crop=Rice&state=Punjab
```

#### Soil Health Assessment
```
GET /farmer-ai/soil-health?soilType=Alluvial%20Soil&cropType=Wheat&state=Punjab
```

#### Water Management
```
GET /farmer-ai/water-management?irrigationType=Drip&cropType=Cotton&season=Kharif
```

## 🗺 Supported Indian States

- **Maharashtra** - Cotton, Sugarcane, Soybean
- **Punjab** - Rice, Wheat, Maize
- **Tamil Nadu** - Rice, Groundnut, Sugarcane
- **Karnataka** - Cotton, Sugarcane, Jowar
- **Gujarat** - Cotton, Groundnut, Castor
- **Uttar Pradesh** - Wheat, Rice, Sugarcane
- **Rajasthan** - Bajra, Jowar, Mustard
- **Madhya Pradesh** - Soybean, Wheat, Cotton
- **West Bengal** - Rice, Jute, Potato

## 🌱 Supported Crops by Season

### Kharif Season (June-October)
- **Rice** - Punjab, Tamil Nadu, West Bengal
- **Cotton** - Maharashtra, Gujarat, Karnataka
- **Sugarcane** - Maharashtra, Uttar Pradesh, Karnataka
- **Maize** - Karnataka, Maharashtra, Punjab
- **Soybean** - Madhya Pradesh, Maharashtra

### Rabi Season (November-April)
- **Wheat** - Punjab, Uttar Pradesh, Madhya Pradesh
- **Groundnut** - Tamil Nadu, Gujarat, Karnataka
- **Mustard** - Rajasthan, Madhya Pradesh
- **Gram** - Madhya Pradesh, Rajasthan, Maharashtra

### Zaid Season (April-June)
- **Fodder Crops** - Punjab, Haryana
- **Vegetables** - All states
- **Watermelon** - Rajasthan, Gujarat

## 🏛 Government Schemes Covered

1. **PM-KISAN** - Direct income support (Rs 6000/year)
2. **PMFBY** - Crop insurance scheme
3. **Soil Health Card Scheme** - Soil testing and recommendations
4. **PMKSY** - Irrigation support and water conservation
5. **National Food Security Mission** - Food grain production
6. **National Oilseeds Mission** - Oilseed crop support
7. **Cotton Technology Mission** - Cotton farming advancement

## 🌐 Language Support

The platform is designed to support multiple Indian languages:
- Hindi (हिंदी)
- English
- Telugu (తెలుగు)
- Tamil (தமிழ்)
- Bengali (বাংলা)
- Marathi (मराठी)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)
- Odia (ଓଡ଼ିଆ)
- Assamese (অসমীয়া)

## 📱 Usage Examples

### Getting Crop Recommendations for Maharashtra
```bash
curl "http://localhost:3001/farmer-ai/crop-recommendations?state=Maharashtra&season=Kharif"
```

### AI Assistant for Farming Query
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"query": "Best irrigation method for cotton farming in Maharashtra"}' \
  http://localhost:3001/farmer-ai/farming-assistant
```

### Check Market Prices
```bash
curl "http://localhost:3001/farmer-ai/market-prices?crop=Cotton"
```

### Get Government Schemes
```bash
curl "http://localhost:3001/farmer-ai/government-schemes"
```

## 🔧 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables** (Optional)
   ```bash
   export MONGODB_URL="your_mongodb_connection_string"
   export NODE_ENV="production"
   ```

3. **Start the Application**
   ```bash
   npm start
   ```

4. **Access the Platform**
   - Main API: `http://localhost:3001/`
   - Farmer AI Services: `http://localhost:3001/farmer-ai/*`

## 📊 Sample Data

The platform includes comprehensive sample data for:
- **Crop varieties** for each state and season
- **Government schemes** with complete details
- **Market prices** for major agricultural commodities
- **Soil types** and their management
- **Irrigation methods** and best practices
- **Fertilizer recommendations** by crop and soil type

## 🎯 Future Enhancements

1. **Machine Learning Integration**
   - Predictive analytics for crop yield
   - Weather pattern analysis
   - Pest/disease prediction models

2. **Real-time Data Integration**
   - Live weather API integration
   - Real-time market price feeds
   - Government scheme updates

3. **Mobile Application**
   - Android/iOS apps for farmers
   - Offline functionality
   - Voice commands in regional languages

4. **Advanced Features**
   - Satellite imagery analysis
   - Drone-based crop monitoring
   - IoT sensor integration for precision farming

## 🆘 Support & Help

- **Farmer Helpline**: 1800-180-1551
- **PM-KISAN Support**: 155261
- **Email Support**: Available through government departments
- **Website**: Government agriculture portals linked in responses

## 📄 License

This project extends the existing Node-Mongo-setup repository with farmer-specific AI features designed to help Indian agriculture.

---

**Made with ❤️ for Indian Farmers** 🚜🌾