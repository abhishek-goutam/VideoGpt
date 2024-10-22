const youtubeDlExec = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');
const transcriptionService = require('../utils/transcriptionService');

ffmpeg.setFfmpegPath(ffmpegStatic);

exports.processVideoFromUrl = async (url) => {
  return new Promise((resolve, reject) => {
    const outputFilePath = path.join(__dirname, '../../public', 'output.mp3');
    const tempFilePath = path.join(__dirname, '../../public', 'temp_video.mp4');

    // Download the video using youtube-dl-exec
    youtubeDlExec(url, {
      output: tempFilePath,
      format: 'bestaudio/best',
      noCheckCertificate: true,
      quiet: false // Change to true if you want less output
    })
    .then(() => {
      // Process the downloaded video with ffmpeg to extract audio
      ffmpeg(tempFilePath)
        .audioBitrate(128)
        .toFormat('mp3')
        .on('end', async () => {
          console.log('Audio extraction completed:', outputFilePath);
          
          // Delete the temporary video file after extraction
          fs.unlink(tempFilePath, (err) => {
            if (err) console.error('Failed to delete temp file:', err.message);
          });

          // Extract the transcript
          const transcript = await transcriptionService.extractTranscript(outputFilePath);
          console.log("transcript ",transcript)
          resolve(transcript);
        })
        .on('error', (err) => {
          console.error('Error occurred during extraction:', err.message);
          reject(err);
        })
        .save(outputFilePath);
    })
    .catch((err) => {
      console.error('Error occurred while downloading video:', err);
      reject(new Error('Failed to download video: ' + err.message));
    });
  });
};
