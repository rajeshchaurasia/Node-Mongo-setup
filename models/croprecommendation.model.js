const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CropRecommendationSchema = new Schema({
  state: {
    type: String,
    required: true
  },
  season: {
    type: String,
    enum: ['Kharif', 'Rabi', 'Zaid', 'Perennial'],
    required: true
  },
  soilType: {
    type: String,
    required: true
  },
  cropName: {
    type: String,
    required: true
  },
  variety: {
    type: String,
    required: true
  },
  plantingTime: {
    type: String,
    required: true
  },
  harvestTime: {
    type: String,
    required: true
  },
  waterRequirement: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  expectedYield: {
    type: String,
    required: true
  },
  marketPrice: {
    min: Number,
    max: Number,
    unit: String
  },
  fertilizers: [{
    name: String,
    quantity: String,
    timing: String
  }],
  pesticides: [{
    name: String,
    purpose: String,
    timing: String
  }],
  tips: [String],
  governmentSchemes: [String]
});

const CropRecommendationModel = mongoose.model('croprecommendation', CropRecommendationSchema);

module.exports = CropRecommendationModel;