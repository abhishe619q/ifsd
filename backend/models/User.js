const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedGenres: [{ type: String }],    // e.g. ["pop", "rock"]
  likedTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
