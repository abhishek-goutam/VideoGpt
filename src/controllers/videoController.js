const videoProcessingService = require('../services/videoProcessingService');
const transcriptionService = require('../utils/transcriptionService');
const Transcript = require('../models/transcript');

exports.uploadVideoFromUrl = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) return res.status(400).json({ error: 'No URL provided' });

    const transcriptText = await videoProcessingService.processVideoFromUrl(url);
     console.log("transcripttext",transcriptText)
    // Save transcript to database
    const newTranscript = new Transcript({
      videoId: url,  // You can also generate a unique ID or hash for this
      transcript: transcriptText,
    });
    await newTranscript.save();

    res.status(200).json({ message: 'Video processed successfully', transcript: transcriptText });
  } catch (error) {
    res.status(500).json({ error: error.message,message: "hello" });
  }
};

exports.queryVideo = async (req, res) => {
  try {
    const { videoId, query } = req.body;

    // Fetch the transcript from the database
    const transcriptRecord = await Transcript.findOne({ videoId });
    if (!transcriptRecord) {
      return res.status(404).json({ error: 'Transcript not found for the given video' });
    }

    // Analyze the transcript based on the query
    const response = await transcriptionService.queryTranscript(videoId, query, transcriptRecord.transcript);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
