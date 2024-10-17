const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Upload video URL
router.post('/upload-url', videoController.uploadVideoFromUrl);

// Query the video transcript
router.post('/query', videoController.queryVideo);

module.exports = router;
