const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');
const transcriptionService = require('../utils/transcriptionService');

ffmpeg.setFfmpegPath(ffmpegStatic);

exports.processVideoFromUrl = async (url) => {
  return new Promise((resolve, reject) => {
    if (!ytdl.validateURL(url)) {
      return reject(new Error('Invalid YouTube URL'));
    }

    const outputFilePath = path.join(__dirname, '../../public', 'output.mp3');
    const videoStream = ytdl(url);

    ffmpeg(videoStream)
      .audioBitrate(128)
      .toFormat('mp3')
      .on('end', async () => {
        console.log('Audio extraction completed:', outputFilePath);
        const transcript = await transcriptionService.extractTranscript(outputFilePath);
        resolve(transcript);
      })
      .on('error', (err) => {
        console.error('Error occurred during extraction:', err.message);
        reject(err);
      })
      .save(outputFilePath);
  });
};
