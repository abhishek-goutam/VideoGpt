const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  transcript: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transcript = mongoose.model('Transcript', transcriptSchema);

module.exports = Transcript;
