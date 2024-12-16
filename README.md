
# Youtube Token Manager API

A NestJS-based API that fetches authenticated users' YouTube liked videos using Kafka message streaming.

## Features

- OAuth2 authentication with YouTube API
- Automatic token refresh handling
- Fetch user's liked videos from YouTube
- Kafka integration for message streaming
- Global error handling
- Robust token management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Kafka broker running
- YouTube API credentials
- Docker (optional)

## Environment Variables

```bash
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
KAFKA_BROKERS=localhost:9092
PORT=3000
```

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
    ```bash
    npm run start:dev
    ```
## API Endpoints
### YouTube
### GET /youtube/liked-videos

- Fetches authenticated user's liked videos
- Requires valid access token
- Streams results through Kafka
  
### Authentication
- Complete OAuth2 flow with YouTube
- Automatic token refresh mechanism
- Secure token storage
  
## Development Commands
```bash
# Development server
npm run start:dev

# Production build
npm run build

# Start production server
npm run start
```

## Architecture Overview
- RESTful API built with NestJS
- YouTube Data API integration
- Kafka message streaming
- OAuth2 authentication flow
- In-memory token management
- Centralized error handling