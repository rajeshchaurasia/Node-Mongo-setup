const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FarmerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
    enum: ['Andhra Pradesh', 'Assam', 'Bihar', 'Gujarat', 'Haryana', 'Himachal Pradesh', 
           'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 
           'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other']
  },
  district: {
    type: String,
    required: true
  },
  farmSize: {
    type: Number, // in acres
    required: true
  },
  soilType: {
    type: String,
    enum: ['Black Cotton Soil', 'Alluvial Soil', 'Red Soil', 'Laterite Soil', 
           'Desert Soil', 'Mountain Soil', 'Sandy Soil', 'Clay Soil'],
    required: true
  },
  irrigationType: {
    type: String,
    enum: ['Drip Irrigation', 'Sprinkler', 'Flood Irrigation', 'Rainfed', 'Bore Well', 'Canal'],
    required: true
  },
  currentCrops: [{
    cropName: String,
    variety: String,
    plantingDate: Date,
    expectedHarvest: Date,
    area: Number // in acres
  }],
  language: {
    type: String,
    enum: ['Hindi', 'English', 'Telugu', 'Tamil', 'Bengali', 'Marathi', 'Gujarati', 
           'Kannada', 'Malayalam', 'Punjabi', 'Odiya', 'Assamese'],
    default: 'Hindi'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

FarmerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const FarmerModel = mongoose.model('farmer', FarmerSchema);

module.exports = FarmerModel;