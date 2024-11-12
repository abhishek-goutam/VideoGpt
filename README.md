# **VideoGPT: Interactive Video Analysis System**
VideoGPT is a backend system for interactive video analysis that allows users to load, query, and interact with video content. Using this system, users can extract transcripts from videos, store them in a database, and query specific information from the transcript. VideoGPT is built with a focus on scalability, efficiency, and support for handling large query volumes.

# Table of Contents
1. Features
2. Technology Stack
3. Project Structure
4. Setup Instructions
5. Environment Variables
6. Usage
7. API Endpoints
   
# Features
Upload and Process Video Transcripts: Extracts transcripts from videos hosted on platforms like YouTube and stores them in MongoDB.
+ **Query-Based Interaction:** Allows users to input queries and receive relevant responses based on the transcript content.
+ **Error Handling and Logging:** Provides robust error logging and detailed error messages for debugging.
+ **Scalability and Efficiency:** Designed to handle multiple users and large query volumes.
  
# Technology Stack
+ **Backend**: Node.js, Express.js
+ **Database**: MongoDB
+ **AI Services**: OpenAI API for transcription and query response generation
+ **Environment Management**: dotenv
+ 
# Project Structure

VideoGPT/
├── index.js                # Main entry point
├── src/
│   ├── config/             # Configuration files
│   ├── controllers/        # Controller logic for routes
│   ├── models/             # Mongoose models
│   ├── routes/             # API route definitions
│   ├── services/           # Core service logic
│   └── utils/              # Utility functions (e.g., transcriptionService)
├── .env                    # Environment variable file
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
## **Setup Instructions**

1. **Clone the repository:**
git clone https://github.com/your-username/VideoGPT.git
cd VideoGPT
2. **Install dependencies:**
npm install
3. **Set up MongoDB Atlas:**
Create a MongoDB Atlas account and set up a new database.
Obtain the MongoDB URI and whitelist your IP address in MongoDB Atlas.

4. **Set up OpenAI API:** Sign up at OpenAI and get your API key. Ensure your API access is within usage limits on the free tier.
  
5. **Add environment variables:** Create a .env file in the project root and add the environment variables
 

# **Environment Variables**
Define the following variables in the .env file:

**MONGO_URI=your_mongo_db_uri**

**PORT=3000**

**OPENAI_API_KEY=your_openai_api_key**

# Usage

**Run the server:npm start**Usage
To interact with the backend API, you can use a tool like Postman or cURL. Here are the key functionalities:

Upload Video URL and Process Transcript:

# API Endpoints

 **Endpoint: POST /api/videos/upload-url**
Body:
json
{
  "url": "your_video_url"
}
Query Video Transcript:

**Endpoint: POST /api/videos/query**
Body:
json
{
  "videoId": "your_video_id",
  "query": "your_query_text"
}
# API Endpoints
| Method                | Endpoint                                 | Description        |
|------------------------|---------------------------------------------|---------------|
| POST | /api/videos/upload-url    | Uploads a video URL, processes the transcript     |
| POST | /api/videos/query | Queries the transcript of a video


Example Queries
Uploading a Video: Use POST /api/videos/upload-url with a body containing the video URL. The system will process the video, transcribe it, and store the result.
Querying a Transcript: Use POST /api/videos/query with videoId and query fields to search for relevant information in the transcript.
