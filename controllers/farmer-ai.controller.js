const Farmer = require('../models/farmer.model.js');
const CropRecommendation = require('../models/croprecommendation.model.js');
const Advisory = require('../models/advisory.model.js');

// Sample data for Indian agriculture
const cropDatabase = {
  'Maharashtra': {
    'Kharif': [
      {
        cropName: 'Cotton',
        variety: 'Bt Cotton',
        plantingTime: 'June-July',
        harvestTime: 'December-January',
        waterRequirement: 'Medium',
        expectedYield: '15-20 quintals/hectare',
        tips: ['Use drip irrigation', 'Monitor for bollworm', 'Apply neem oil as organic pesticide']
      },
      {
        cropName: 'Sugarcane',
        variety: 'Co-86032',
        plantingTime: 'February-April',
        harvestTime: 'December-February',
        waterRequirement: 'High',
        expectedYield: '80-100 tons/hectare',
        tips: ['Requires regular irrigation', 'Use micro-nutrients', 'Harvest at proper maturity']
      }
    ],
    'Rabi': [
      {
        cropName: 'Wheat',
        variety: 'HD-2967',
        plantingTime: 'November-December',
        harvestTime: 'March-April',
        waterRequirement: 'Medium',
        expectedYield: '25-30 quintals/hectare',
        tips: ['Sow at proper depth', 'Use certified seeds', 'Apply fertilizers in splits']
      }
    ]
  },
  'Punjab': {
    'Kharif': [
      {
        cropName: 'Rice',
        variety: 'Basmati 1121',
        plantingTime: 'June-July',
        harvestTime: 'October-November',
        waterRequirement: 'High',
        expectedYield: '35-40 quintals/hectare',
        tips: ['Maintain water level', 'Use SRI method', 'Control weeds timely']
      }
    ],
    'Rabi': [
      {
        cropName: 'Wheat',
        variety: 'PBW-725',
        plantingTime: 'November',
        harvestTime: 'April',
        waterRequirement: 'Medium',
        expectedYield: '40-45 quintals/hectare',
        tips: ['Use zero-till technology', 'Apply balanced fertilizers', 'Monitor for rust diseases']
      }
    ]
  },
  'Tamil Nadu': {
    'Kharif': [
      {
        cropName: 'Rice',
        variety: 'ADT-43',
        plantingTime: 'June-July',
        harvestTime: 'September-October',
        waterRequirement: 'High',
        expectedYield: '30-35 quintals/hectare',
        tips: ['Use SRI technique', 'Apply organic manures', 'Control stem borer']
      }
    ],
    'Rabi': [
      {
        cropName: 'Groundnut',
        variety: 'VRI-2',
        plantingTime: 'October-November',
        harvestTime: 'February-March',
        waterRequirement: 'Medium',
        expectedYield: '20-25 quintals/hectare',
        tips: ['Use rhizobium culture', 'Apply gypsum', 'Harvest at proper maturity']
      }
    ]
  }
};

const governmentSchemes = [
  {
    name: 'PM-KISAN',
    description: 'Direct income support of Rs 6000 per year to farmer families',
    eligibility: 'All landholding farmer families',
    website: 'https://pmkisan.gov.in'
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme for farmers',
    eligibility: 'All farmers growing notified crops',
    website: 'https://pmfby.gov.in'
  },
  {
    name: 'Soil Health Card Scheme',
    description: 'Provides soil health information to farmers',
    eligibility: 'All farmers',
    website: 'https://soilhealth.dac.gov.in'
  },
  {
    name: 'Pradhan Mantri Krishi Sinchai Yojana',
    description: 'Irrigation support and water conservation',
    eligibility: 'Farmers with irrigation needs',
    website: 'https://pmksy.gov.in'
  }
];

const marketPrices = {
  'Rice': { min: 1800, max: 2200, unit: 'per quintal' },
  'Wheat': { min: 2000, max: 2400, unit: 'per quintal' },
  'Cotton': { min: 5000, max: 6500, unit: 'per quintal' },
  'Sugarcane': { min: 250, max: 350, unit: 'per quintal' },
  'Groundnut': { min: 4500, max: 5500, unit: 'per quintal' }
};

// Create farmer profile
exports.createFarmerProfile = async (req, res) => {
  try {
    const farmer = new Farmer({
      userId: req.body.userId,
      name: req.body.name,
      phone: req.body.phone,
      state: req.body.state,
      district: req.body.district,
      farmSize: req.body.farmSize,
      soilType: req.body.soilType,
      irrigationType: req.body.irrigationType,
      currentCrops: req.body.currentCrops || [],
      language: req.body.language || 'Hindi'
    });

    const savedFarmer = await farmer.save();
    res.status(201).json({
      success: true,
      message: 'Farmer profile created successfully',
      data: savedFarmer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating farmer profile',
      error: error.message
    });
  }
};

// Get crop recommendations based on farmer's location and season
exports.getCropRecommendations = async (req, res) => {
  try {
    const { state, season, soilType } = req.query;
    
    if (!state || !season) {
      return res.status(400).json({
        success: false,
        message: 'State and season are required parameters'
      });
    }

    // Get recommendations from our crop database
    const stateData = cropDatabase[state];
    if (!stateData) {
      return res.status(404).json({
        success: false,
        message: 'No crop data available for the specified state'
      });
    }

    const seasonData = stateData[season];
    if (!seasonData) {
      return res.status(404).json({
        success: false,
        message: 'No crop data available for the specified season'
      });
    }

    // Add market price information
    const recommendations = seasonData.map(crop => ({
      ...crop,
      marketPrice: marketPrices[crop.cropName] || { min: 0, max: 0, unit: 'per quintal' },
      governmentSchemes: governmentSchemes.map(scheme => scheme.name)
    }));

    res.json({
      success: true,
      message: `Crop recommendations for ${state} - ${season} season`,
      data: {
        state,
        season,
        soilType,
        recommendations,
        totalCrops: recommendations.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching crop recommendations',
      error: error.message
    });
  }
};

// Get weather-based agricultural advisory
exports.getWeatherAdvisory = async (req, res) => {
  try {
    const { state, district } = req.query;
    
    // Simulated weather-based advisory
    const weatherAdvisory = {
      location: `${district}, ${state}`,
      date: new Date().toLocaleDateString('en-IN'),
      weather: {
        temperature: '25-32°C',
        humidity: '65-75%',
        rainfall: 'Light showers expected',
        windSpeed: '10-15 km/h'
      },
      advisory: [
        'Light rainfall expected in next 3-4 days, good for Kharif crop sowing',
        'Maintain proper drainage in fields to avoid waterlogging',
        'Monitor crops for fungal diseases due to high humidity',
        'Apply preventive spray for pest control before rain'
      ],
      recommendations: [
        'Postpone harvesting operations for 2-3 days',
        'Cover stored grain properly',
        'Check irrigation channels for blockage',
        'Prepare for post-rain field operations'
      ]
    };

    res.json({
      success: true,
      message: 'Weather-based agricultural advisory',
      data: weatherAdvisory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching weather advisory',
      error: error.message
    });
  }
};

// Get government schemes information
exports.getGovernmentSchemes = async (req, res) => {
  try {
    const { category } = req.query;
    
    let filteredSchemes = governmentSchemes;
    
    if (category) {
      // Filter schemes based on category if needed
      // For now, return all schemes
    }

    res.json({
      success: true,
      message: 'Government schemes for farmers',
      data: {
        schemes: filteredSchemes,
        totalSchemes: filteredSchemes.length,
        lastUpdated: new Date().toLocaleDateString('en-IN')
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching government schemes',
      error: error.message
    });
  }
};

// Get market price predictions
exports.getMarketPrices = async (req, res) => {
  try {
    const { crop, state } = req.query;
    
    if (crop && marketPrices[crop]) {
      const priceData = {
        crop,
        state: state || 'National Average',
        currentPrice: marketPrices[crop],
        trend: 'Stable',
        prediction: 'Prices expected to remain stable for next 2 weeks',
        factors: [
          'Monsoon progress',
          'Market demand',
          'Government MSP',
          'Export opportunities'
        ],
        recommendations: [
          'Current prices are favorable for selling',
          'Monitor market trends regularly',
          'Consider value addition for better returns'
        ]
      };
      
      res.json({
        success: true,
        message: `Market price information for ${crop}`,
        data: priceData
      });
    } else {
      res.json({
        success: true,
        message: 'Current market prices for major crops',
        data: {
          prices: marketPrices,
          lastUpdated: new Date().toLocaleDateString('en-IN'),
          disclaimer: 'Prices are indicative and may vary by location and quality'
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching market prices',
      error: error.message
    });
  }
};

// Get soil health recommendations
exports.getSoilHealthAdvice = async (req, res) => {
  try {
    const { soilType, cropType, state } = req.query;
    
    const soilAdvice = {
      soilType: soilType || 'General',
      cropType: cropType || 'General',
      state: state || 'General',
      healthStatus: 'Moderate',
      recommendations: [
        'Test soil pH regularly - maintain between 6.0-7.5',
        'Add organic matter through compost or farmyard manure',
        'Use balanced NPK fertilizers based on soil test results',
        'Practice crop rotation to maintain soil fertility',
        'Apply lime if soil is acidic, gypsum if alkaline'
      ],
      nutrients: {
        nitrogen: 'Medium',
        phosphorus: 'Low',
        potassium: 'High',
        organicMatter: 'Low'
      },
      improvements: [
        'Increase organic matter content to 2-3%',
        'Apply phosphorus-rich fertilizers',
        'Use green manuring crops',
        'Implement conservation tillage'
      ],
      contactInfo: {
        helplineNumber: '1800-180-1551',
        department: 'Department of Agriculture',
        website: 'https://soilhealth.dac.gov.in'
      }
    };

    res.json({
      success: true,
      message: 'Soil health assessment and recommendations',
      data: soilAdvice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching soil health advice',
      error: error.message
    });
  }
};

// Get water management suggestions
exports.getWaterManagement = async (req, res) => {
  try {
    const { irrigationType, cropType, season } = req.query;
    
    const waterManagement = {
      irrigationType: irrigationType || 'General',
      cropType: cropType || 'General',
      season: season || 'Current',
      waterRequirement: 'Medium',
      recommendations: [
        'Use drip irrigation for water conservation',
        'Install moisture sensors for optimal irrigation timing',
        'Practice mulching to reduce water evaporation',
        'Harvest rainwater during monsoon season',
        'Use sprinkler irrigation for uniform water distribution'
      ],
      schedule: {
        'Kharif': 'Irrigate every 7-10 days depending on rainfall',
        'Rabi': 'Irrigate every 10-15 days based on crop stage',
        'Summer': 'Irrigate every 3-5 days due to high evaporation'
      },
      conservation: [
        'Use mulching to retain soil moisture',
        'Practice contour farming on slopes',
        'Construct farm ponds for water storage',
        'Use drought-resistant varieties',
        'Implement precision irrigation techniques'
      ],
      contactInfo: {
        helplineNumber: '1800-180-1551',
        department: 'Department of Water Resources',
        website: 'https://pmksy.gov.in'
      }
    };

    res.json({
      success: true,
      message: 'Water management recommendations',
      data: waterManagement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching water management advice',
      error: error.message
    });
  }
};

// AI-powered general farming assistant
exports.getFarmingAssistance = async (req, res) => {
  try {
    const { query, farmerId } = req.body;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query is required'
      });
    }

    // Simple keyword-based response system
    const keywords = query.toLowerCase();
    let response = {};

    if (keywords.includes('crop') || keywords.includes('fasal')) {
      response = {
        type: 'Crop Recommendation',
        message: 'I can help you choose the right crops for your farm.',
        suggestions: [
          'Tell me your state and current season for crop recommendations',
          'Consider your soil type and available irrigation',
          'Check government schemes for crop support'
        ],
        nextAction: 'Use /api/farmer-ai/crop-recommendations endpoint'
      };
    } else if (keywords.includes('weather') || keywords.includes('mausam')) {
      response = {
        type: 'Weather Advisory',
        message: 'Weather information is crucial for farming decisions.',
        suggestions: [
          'Check 7-day weather forecast regularly',
          'Plan farm operations based on weather predictions',
          'Take preventive measures before extreme weather'
        ],
        nextAction: 'Use /api/farmer-ai/weather-advisory endpoint'
      };
    } else if (keywords.includes('price') || keywords.includes('market') || keywords.includes('bazar')) {
      response = {
        type: 'Market Information',
        message: 'Market prices help you make profitable decisions.',
        suggestions: [
          'Check current market rates before selling',
          'Consider seasonal price variations',
          'Explore value addition opportunities'
        ],
        nextAction: 'Use /api/farmer-ai/market-prices endpoint'
      };
    } else if (keywords.includes('soil') || keywords.includes('mitti')) {
      response = {
        type: 'Soil Health',
        message: 'Healthy soil is the foundation of good farming.',
        suggestions: [
          'Get your soil tested regularly',
          'Use organic manures and compost',
          'Practice crop rotation'
        ],
        nextAction: 'Use /api/farmer-ai/soil-health endpoint'
      };
    } else if (keywords.includes('water') || keywords.includes('pani') || keywords.includes('irrigation')) {
      response = {
        type: 'Water Management',
        message: 'Efficient water use improves crop yield and saves resources.',
        suggestions: [
          'Use drip irrigation for water conservation',
          'Practice rainwater harvesting',
          'Monitor soil moisture levels'
        ],
        nextAction: 'Use /api/farmer-ai/water-management endpoint'
      };
    } else {
      response = {
        type: 'General Assistance',
        message: 'I am your AI farming assistant. I can help you with:',
        suggestions: [
          'Crop recommendations based on your location and season',
          'Weather-based farming advisory',
          'Government schemes and subsidies information',
          'Market price updates and predictions',
          'Soil health assessment and improvement tips',
          'Water management and irrigation guidance'
        ],
        availableServices: [
          'Crop Recommendations',
          'Weather Advisory',
          'Market Prices',
          'Soil Health',
          'Water Management',
          'Government Schemes'
        ]
      };
    }

    res.json({
      success: true,
      message: 'AI Farming Assistant Response',
      query: query,
      response: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing farming assistance request',
      error: error.message
    });
  }
};