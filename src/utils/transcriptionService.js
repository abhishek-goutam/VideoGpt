const fs = require('fs');
const openai = require('../config/openaiConfiguration');

exports.extractTranscript = async (audioFilePath) => {
  try {
    const audioFile = fs.createReadStream(audioFilePath);

    const response = await openai.createTranscription(
      audioFile,
      'whisper-1',
      '',
      'text',
      1.0
    );

    const transcript = response.data.text;
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

    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    const answer = response.data.choices[0].text.trim();
    return answer;
  } catch (error) {
    console.error('Error during content analysis:', error.message);
    throw new Error('Failed to analyze the transcript');
  }
};
