const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genres: [String],   // e.g. ["pop","dance"]
  popularity: { type: Number, default: 0 } // simple popularity metric
});

module.exports = mongoose.model('Track', trackSchema);

