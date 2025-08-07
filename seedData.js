const mongoose = require('mongoose');
const CropRecommendation = require('./models/croprecommendation.model.js');
const Advisory = require('./models/advisory.model.js');
const dbConfig = require('./config/database.config.js');

// Sample crop recommendations for Indian states
const sampleCropRecommendations = [
  {
    state: 'Maharashtra',
    season: 'Kharif',
    soilType: 'Black Cotton Soil',
    cropName: 'Cotton',
    variety: 'Bt Cotton Hybrid',
    plantingTime: 'June-July (with onset of monsoon)',
    harvestTime: 'December-January',
    waterRequirement: 'Medium',
    expectedYield: '15-20 quintals per hectare',
    marketPrice: { min: 5000, max: 6500, unit: 'per quintal' },
    fertilizers: [
      { name: 'Urea', quantity: '100 kg/hectare', timing: 'At planting and flowering' },
      { name: 'DAP', quantity: '50 kg/hectare', timing: 'At planting' },
      { name: 'Potash', quantity: '25 kg/hectare', timing: 'At planting' }
    ],
    pesticides: [
      { name: 'Neem Oil', purpose: 'Organic pest control', timing: 'Every 15 days' },
      { name: 'Bt Spray', purpose: 'Bollworm control', timing: 'As needed based on scouting' }
    ],
    tips: [
      'Use certified Bt cotton seeds',
      'Maintain proper plant spacing (90x30 cm)',
      'Monitor for pink bollworm and take preventive measures',
      'Use drip irrigation for water conservation',
      'Practice crop rotation with legumes'
    ],
    governmentSchemes: ['PM-KISAN', 'PMFBY', 'Cotton Technology Mission']
  },
  {
    state: 'Punjab',
    season: 'Kharif',
    soilType: 'Alluvial Soil',
    cropName: 'Rice',
    variety: 'Basmati 1121',
    plantingTime: 'June-July (transplanting after 25-30 days of nursery)',
    harvestTime: 'October-November',
    waterRequirement: 'High',
    expectedYield: '35-40 quintals per hectare',
    marketPrice: { min: 3500, max: 4500, unit: 'per quintal' },
    fertilizers: [
      { name: 'Urea', quantity: '150 kg/hectare', timing: 'Split application - basal, tillering, panicle' },
      { name: 'DAP', quantity: '75 kg/hectare', timing: 'At transplanting' },
      { name: 'Potash', quantity: '50 kg/hectare', timing: 'At transplanting and panicle stage' }
    ],
    pesticides: [
      { name: 'Cartap Hydrochloride', purpose: 'Stem borer control', timing: 'As per scouting' },
      { name: 'Imidacloprid', purpose: 'Brown plant hopper control', timing: 'As needed' }
    ],
    tips: [
      'Use System of Rice Intensification (SRI) method',
      'Maintain 2-3 cm water level in fields',
      'Transplant young seedlings (15-20 days old)',
      'Practice alternate wetting and drying',
      'Use laser land leveling for uniform water distribution'
    ],
    governmentSchemes: ['PM-KISAN', 'PMFBY', 'National Food Security Mission']
  },
  {
    state: 'Tamil Nadu',
    season: 'Rabi',
    soilType: 'Red Soil',
    cropName: 'Groundnut',
    variety: 'VRI-2',
    plantingTime: 'October-November',
    harvestTime: 'February-March',
    waterRequirement: 'Medium',
    expectedYield: '20-25 quintals per hectare',
    marketPrice: { min: 4500, max: 5500, unit: 'per quintal' },
    fertilizers: [
      { name: 'Gypsum', quantity: '500 kg/hectare', timing: 'At flowering stage' },
      { name: 'DAP', quantity: '100 kg/hectare', timing: 'At sowing' },
      { name: 'Potash', quantity: '75 kg/hectare', timing: 'At sowing' }
    ],
    pesticides: [
      { name: 'Chlorpyrifos', purpose: 'Thrips and jassid control', timing: 'As per need' },
      { name: 'Mancozeb', purpose: 'Rust and leaf spot control', timing: 'Preventive spray' }
    ],
    tips: [
      'Use rhizobium and phosphorus solubilizing bacteria',
      'Apply gypsum during pod formation for better yield',
      'Maintain soil moisture during pod development',
      'Harvest at proper maturity (120-130 days)',
      'Practice intercropping with castor or pearl millet'
    ],
    governmentSchemes: ['PM-KISAN', 'PMFBY', 'National Oilseeds Mission']
  }
];

// Sample agricultural advisories
const sampleAdvisories = [
  {
    title: 'Monsoon Preparedness Advisory',
    type: 'Weather Alert',
    priority: 'High',
    content: 'Monsoon is expected to arrive in the next 7-10 days. Farmers should prepare their fields for Kharif season sowing. Ensure proper drainage systems are in place to avoid waterlogging.',
    applicableStates: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Madhya Pradesh'],
    applicableCrops: ['Cotton', 'Sugarcane', 'Soybean', 'Maize'],
    validFrom: new Date(),
    validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    language: 'English',
    actionItems: [
      'Clean field channels and improve drainage',
      'Arrange quality seeds and fertilizers',
      'Service farm equipment and machinery',
      'Apply pre-emergence herbicides if needed'
    ],
    contactInfo: {
      helplineNumber: '1800-180-1551',
      department: 'Department of Agriculture & Cooperation',
      website: 'https://agricoop.nic.in'
    }
  },
  {
    title: 'Fall Armyworm Alert in Maize Crops',
    type: 'Pest Warning',
    priority: 'Critical',
    content: 'Fall Armyworm infestation has been reported in maize crops across several districts. Immediate action required to prevent crop damage. Early detection and control measures are essential.',
    applicableStates: ['Karnataka', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu'],
    applicableCrops: ['Maize', 'Sorghum'],
    validFrom: new Date(),
    validTill: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    language: 'English',
    actionItems: [
      'Scout fields regularly for whorl damage',
      'Use pheromone traps for early detection',
      'Apply recommended insecticides (Emamectin Benzoate)',
      'Release natural enemies like Telenomus remus',
      'Report heavy infestations to local agriculture office'
    ],
    contactInfo: {
      helplineNumber: '1800-425-1551',
      department: 'Plant Protection Division',
      website: 'https://ppqs.gov.in'
    }
  },
  {
    title: 'PM-KISAN Scheme - Next Installment Release',
    type: 'Government Scheme',
    priority: 'Medium',
    content: 'The next installment of PM-KISAN scheme (Rs. 2000) will be released to eligible farmers. Ensure your Aadhaar and bank details are updated in the PM-KISAN portal.',
    applicableStates: ['All States'],
    applicableCrops: ['All Crops'],
    validFrom: new Date(),
    validTill: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    language: 'English',
    actionItems: [
      'Verify and update Aadhaar linking',
      'Check bank account details in PM-KISAN portal',
      'Complete e-KYC if not done',
      'Contact local agriculture officer for assistance',
      'Download PM-KISAN mobile app for updates'
    ],
    contactInfo: {
      helplineNumber: '155261',
      department: 'PM-KISAN Cell',
      website: 'https://pmkisan.gov.in'
    }
  },
  {
    title: 'Soil Health Card Distribution',
    type: 'Soil Health',
    priority: 'Medium',
    content: 'Soil Health Cards are being distributed to farmers. Get your soil tested and receive customized fertilizer recommendations to improve soil fertility and crop productivity.',
    applicableStates: ['All States'],
    applicableCrops: ['All Crops'],
    validFrom: new Date(),
    validTill: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    language: 'English',
    actionItems: [
      'Contact local agriculture extension officer',
      'Provide soil samples from your field',
      'Collect your Soil Health Card',
      'Follow fertilizer recommendations',
      'Monitor soil health improvement over time'
    ],
    contactInfo: {
      helplineNumber: '1800-180-1551',
      department: 'Soil Health Management',
      website: 'https://soilhealth.dac.gov.in'
    }
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await CropRecommendation.deleteMany({});
    await Advisory.deleteMany({});
    console.log('Cleared existing data...');

    // Insert sample crop recommendations
    await CropRecommendation.insertMany(sampleCropRecommendations);
    console.log(`Inserted ${sampleCropRecommendations.length} crop recommendations`);

    // Insert sample advisories
    await Advisory.insertMany(sampleAdvisories);
    console.log(`Inserted ${sampleAdvisories.length} advisories`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleCropRecommendations, sampleAdvisories };