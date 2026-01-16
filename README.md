# SQL AI Agent

An AI-powered SQL learning platform where you can get instant help with SQL queries, share questions with the community, and learn from others.

![React](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Claude AI](https://img.shields.io/badge/AI-Claude-purple)

## What It Does

- **AI SQL Assistant** — Paste your database schema and ask questions in plain English. Get SQL queries with explanations.
- **Community Q&A** — Post SQL questions, answer others, and learn together. Questions are auto-categorized by AI.
- **Schema-Aware** — The AI understands your specific table structure and relationships.

## Demo

The app features:
- Beautiful login page with animated falling SQL statements
- Three-column layout: Schema | AI Chat | Community
- Real-time AI responses powered by Claude
- Persistent community questions stored in SQLite

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite
- **AI**: Anthropic Claude API

## Want to Contribute?

This project is open for contributions! If you're interested in improving or extending it:

1. **Fork this repository**
2. Clone your fork locally
3. Create a `.env` file with your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your-key-here
   ```
4. Install dependencies: `npm install`
5. Run the app: `npm run dev`
6. Make your changes and submit a PR!

Get your API key from: https://console.anthropic.com/settings/keys

## Ideas for Contribution

- Add user authentication (Google OAuth, etc.)
- Implement real database connections to test queries
- Add syntax highlighting for SQL
- Support for different SQL dialects (MySQL, PostgreSQL, etc.)
- Add query history and favorites
- Dark/light theme toggle
- Mobile responsive design improvements

## License

MIT — Feel free to use, modify, and distribute.

---

*Built with Claude AI*
