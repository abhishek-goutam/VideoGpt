require('dotenv').config(); 
const fs = require('fs');
const { OpenAI } = require('openai'); 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.extractTranscript = async (audioFilePath) => {
  try {
    const audioFile = fs.createReadStream(audioFilePath);

    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      response_format: 'text',
    });

    console.log("Response:", response);
    const transcript = response; 
console.log("transcript", transcript)

    // Access 'text' from the response
    return transcript;
  } catch (error) {
    // Enhanced error logging with detailed messages
    console.error('Error during transcription:', error.message);

    // Check if the error is from OpenAI API
    if (error.response) {
      console.error('OpenAI API Error:');
      console.error('  Status Code:', error.response.status);
      console.error('  Response Data:', error.response.data); // Log the complete response data for better insight
    } else if (error.request) {
      console.error('No response received from OpenAI API:');
      console.error('  Request Details:', error.request); // Log request details that were sent
    } else {
      console.error('General Error:', error); // Log any other errors
    }

    // Provide a detailed error message
    throw new Error(`Failed to transcribe audio file at ${audioFilePath}: ${error.message}`);
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
