# The Arthe Code Live - Collaborative Code Editor

A real-time collaborative code editor that allows multiple users to code together in real-time. Built with React, CodeMirror, and Y.js.

## Live Demo

Visit [https://thearthecodelive.netlify.app](https://thearthecodelive.netlify.app) to try it out!

## Features

- 🤝 Real-time collaboration with multiple users
- 🎨 Syntax highlighting for JavaScript/TypeScript and Python
- 🌓 Dark/Light theme support
- 🔗 Share sessions via URL
- 👥 See active users and their cursors
- 💾 No backend required - uses P2P WebRTC

## How to Use

1. Visit the website
2. Enter your name when prompted
3. Start coding in the editor
4. Share your session URL with others to collaborate
5. See real-time changes as others type
6. Use the sidebar to:
   - View active users
   - Toggle dark/light theme
   - Share the session URL
   - Download your code

## Collaboration Guide

1. When you create a new session, you'll get a unique URL
2. Share this URL with your collaborators
3. Anyone with the URL can join and edit in real-time
4. Each user gets a unique color for their cursor
5. Changes are synchronized instantly across all participants

## Technical Details

- Built with React and Vite
- Uses CodeMirror 6 for the editor
- Y.js and WebRTC for real-time collaboration
- Tailwind CSS for styling
- Deployed on Netlify with proper routing

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The site is automatically deployed to Netlify with the following configuration:
- Build command: `npm run build`
- Publish directory: `dist`
- Routing: All routes redirect to index.html for client-side routing