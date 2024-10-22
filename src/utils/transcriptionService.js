require('dotenv').config(); // Load environment variables from .env file

const fs = require('fs');
const { OpenAI } = require('openai'); // Import OpenAI

// Initialize OpenAI API with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
});

exports.extractTranscript = async (audioFilePath) => {
  try {
    const audioFile = fs.createReadStream(audioFilePath);

    // Use the updated method for transcription
    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1', // Specify the model
      response_format: 'text', // The desired response format
    });

    const transcript = response.text; // Access the transcript directly
    console.log("transcript in the transcription service",transcript)
    return transcript;
  } catch (error) {
    console.error('Error during transcription:', error.message);
    throw new Error('Failed to transcribe audio');
  }
};

exports.queryTranscript = async (videoId, query, transcript) => {
  try {
    const prompt = `
      The following is a transcript from a video:
      ${transcript}
      
      The user has asked: "${query}"
      
      Please provide a response based on the content of the transcript.
    `;

    // Use the updated method for chat completions
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const answer = response.choices[0].message.content.trim(); // Access the message content
    return answer;
  } catch (error) {
    console.error('Error during content analysis:', error.message);
    throw new Error('Failed to analyze the transcript');
  }
};
