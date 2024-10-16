const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");

// Set the path for ffmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);

async function extractAudioFromYoutube(url, outputPath) {
  try {
    if (!ytdl.validateURL(url)) {
      throw new Error("Invalid YouTube URL");
    }
    
    const videoStream = ytdl(url, { quality: "highestaudio" });

    ffmpeg(videoStream)
      .audioBitrate(128)
      .toFormat("mp3")
      .save(outputPath)
      .on("progress", (progress) => {
        console.log(`Processing: ${progress.targetSize} KB converted`);
      })
      .on("end", () => {
        console.log("Audio extraction completed:", outputPath);
      })
      .on("error", (err) => {
        console.error("Error occurred during extraction:", err.message);
      });
  } catch (error) {
    console.error("Failed to extract audio:", error.message);
  }
}

// Update the output file path for Windows
const youtubeURL = "https://www.youtube.com/watch?v=hiVKXJ2hAdo";
const outputFilePath = "C:/Users/abhi/Desktop/VideoGpt/extractedAudio.mp3";

// Extract audio
extractAudioFromYoutube(youtubeURL, outputFilePath);
