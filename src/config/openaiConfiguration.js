const { OpenAI } = require('openai'); // Make sure to destructure OpenAI

// Load environment variables
require('dotenv').config(); 

// Log to check if the API key is being loaded correctly
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

// Create an instance of OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is valid
});

module.exports = openai;
