const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvisorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Weather Alert', 'Pest Warning', 'Disease Alert', 'Market Update', 
           'Government Scheme', 'General Advisory', 'Soil Health', 'Water Management'],
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  content: {
    type: String,
    required: true
  },
  applicableStates: [String],
  applicableCrops: [String],
  validFrom: {
    type: Date,
    default: Date.now
  },
  validTill: {
    type: Date,
    required: true
  },
  language: {
    type: String,
    enum: ['Hindi', 'English', 'Telugu', 'Tamil', 'Bengali', 'Marathi', 'Gujarati', 
           'Kannada', 'Malayalam', 'Punjabi', 'Odiya', 'Assamese'],
    default: 'Hindi'
  },
  actionItems: [String],
  contactInfo: {
    helplineNumber: String,
    department: String,
    website: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AdvisoryModel = mongoose.model('advisory', AdvisorySchema);

module.exports = AdvisoryModel;