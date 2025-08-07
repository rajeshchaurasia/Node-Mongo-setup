var express = require('express');
var router = express.Router();
const farmerAI = require('../controllers/farmer-ai.controller.js');

// Farmer Profile Management
router.post('/farmer-profile', farmerAI.createFarmerProfile);

// AI-powered farming assistance
router.post('/farming-assistant', farmerAI.getFarmingAssistance);

// Crop recommendations based on location, season, and soil type
router.get('/crop-recommendations', farmerAI.getCropRecommendations);

// Weather-based agricultural advisory
router.get('/weather-advisory', farmerAI.getWeatherAdvisory);

// Government schemes information
router.get('/government-schemes', farmerAI.getGovernmentSchemes);

// Market price predictions and current rates
router.get('/market-prices', farmerAI.getMarketPrices);

// Soil health assessment and recommendations
router.get('/soil-health', farmerAI.getSoilHealthAdvice);

// Water management and irrigation guidance
router.get('/water-management', farmerAI.getWaterManagement);

module.exports = router;