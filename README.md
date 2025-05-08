# CourseGPT - AI-Powered Course Generator

**CourseGPT** is an intelligent full-stack web application that leverages AI to automatically generate comprehensive online courses on any topic. Simply specify your course parameters, and the system will craft a structured learning experience complete with detailed content, code examples, and relevant YouTube video resources.

Developed by [Rajveer](https://github.com/rajveerkhanduja).

<p align="center">
  <a href="https://drive.google.com/file/d/1PkDuQOy3jheXy8S1IzlJRD8VScCvUEbL/view?usp=sharing">
    <strong>Watch Demo Video</strong>
  </a>
</p>

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)

## Features

### Core AI Features
- **AI-Driven Course Structuring**: Uses Google Gemini AI to generate logical course structures based on user inputs (topic, difficulty, length)
- **AI-Generated Content**: Creates detailed chapter content including comprehensive summaries, key learning points, and code examples
- **Smart Video Integration**: Automatically finds and embeds relevant YouTube tutorials for each chapter using the YouTube Data API

### User Experience
- **Multi-Resource Learning**: Each chapter contains multiple resource types (videos, AI text, code) for comprehensive learning
- **Course Customization**: Define topics, objectives, difficulty levels, duration, and chapter count
- **Review & Edit Structure**: Preview and modify the AI-generated structure before final content generation
- **Interactive Learning Interface**: Seamlessly navigate through chapters and resources

### System Features
- **User Authentication**: Secure sign-up and login with JWT and password hashing
- **Responsive Dashboard**: Browse all available courses in an intuitive card format
- **MERN Stack Architecture**: Built on MongoDB, Express.js, React.js, and Node.js

## Tech Stack

### Frontend
- **React.js**: UI components and state management
- **React Router**: Navigation and routing
- **CSS/SCSS**: Styling and responsive design

### Backend
- **Node.js**: Runtime environment
- **Express.js**: API server framework
- **MongoDB**: NoSQL database
- **Mongoose**: Object modeling tool

### AI & APIs
- **Google Gemini AI**: Course content generation
- **YouTube Data API v3**: Video resource integration

### Security
- **JWT**: Authentication and session management
- **bcryptjs**: Password hashing

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rajveerkhanduja/Kalvium-Assignment.git
   cd Kalvium-Assignment
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

## Configuration

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
GEMINI_API_KEY=<your_google_gemini_api_key>
YOUTUBE_API_KEY=<your_youtube_data_api_key>
```

> **Note**: You'll need to obtain API keys from Google Cloud Platform for both Gemini AI and YouTube Data API.

## Usage Guide

### Starting the Application
1. **Start Backend Server**:
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend Development Server**:
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Creating a Course
1. **Sign in** to your account or create a new one
2. Navigate to the **Create Course** section
3. **Fill in the details**:
   - Course topic
   - Course details/objectives
   - Difficulty level (Beginner, Intermediate, Advanced)
   - Duration
   - Number of chapters
4. Click **Create Course** to generate the initial structure
5. **Review and edit** the generated chapter titles, summaries, and durations
6. Click **Save Course** to proceed
7. On the course overview page, click **Generate Course Content**
8. Once complete, explore your new course!
