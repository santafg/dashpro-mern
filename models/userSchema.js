const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  end_year: {
    type: String,
  },
  intensity: {
    type: Number,
  },
  sector: {
    type: String,
  },
  topic: {
    type: String,
  },
  insight: {
    type: String,
  },
  url: {
    type: String,
  },
  region: {
    type: String,
  },
  start_year: {
    type: Number,
  },
  impact: {
    type: String,
  },
  added: {
    type: String,
  },
  published: {
    type: String,
  },
  country: {
    type: String,
  },
  relevance: {
    type: Number,
  },
  pestle: {
    type: String,
  },
  source: {
    type: String,
  },
  title: {
    type: String,
  },
  likelihood: {
    type: Number,
  },
});

const User = new mongoose.model('User' , userSchema);

module.exports = User;
