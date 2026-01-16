import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize SQLite database
const db = new Database(path.join(__dirname, 'community.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT DEFAULT 'Other',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    answer TEXT NOT NULL,
    author TEXT NOT NULL,
    is_ai INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
  );
`);

app.use(cors());
app.use(express.json());

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.warn('\n[Warning] ANTHROPIC_API_KEY not set in .env file');
  console.warn('Create a .env file with: ANTHROPIC_API_KEY=sk-ant-...\n');
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!ANTHROPIC_API_KEY });
});

// Get all community questions
app.get('/api/questions', (req, res) => {
  try {
    const questions = db.prepare(`
      SELECT q.*, 
        (SELECT COUNT(*) FROM answers WHERE question_id = q.id AND is_ai = 0) as answer_count
      FROM questions q 
      ORDER BY q.created_at DESC
    `).all();
    
    res.json(questions);
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Get answers for a question (only human answers, AI answers are stored locally per user)
app.get('/api/questions/:id/answers', (req, res) => {
  try {
    const answers = db.prepare(`
      SELECT * FROM answers WHERE question_id = ? AND is_ai = 0 ORDER BY created_at ASC
    `).all(req.params.id);
    
    res.json(answers);
  } catch (error) {
    console.error('Get answers error:', error);
    res.status(500).json({ error: 'Failed to fetch answers' });
  }
});

// Post a new question
app.post('/api/questions', (req, res) => {
  try {
    const { question, author, category } = req.body;
    
    const result = db.prepare(`
      INSERT INTO questions (question, author, category) VALUES (?, ?, ?)
    `).run(question, author, category || 'Other');
    
    const newQuestion = db.prepare('SELECT * FROM questions WHERE id = ?').get(result.lastInsertRowid);
    res.json(newQuestion);
  } catch (error) {
    console.error('Post question error:', error);
    res.status(500).json({ error: 'Failed to post question' });
  }
});

// Post an answer
app.post('/api/questions/:id/answers', (req, res) => {
  try {
    const { answer, author, is_ai } = req.body;
    
    const result = db.prepare(`
      INSERT INTO answers (question_id, answer, author, is_ai) VALUES (?, ?, ?, ?)
    `).run(req.params.id, answer, author, is_ai ? 1 : 0);
    
    const newAnswer = db.prepare('SELECT * FROM answers WHERE id = ?').get(result.lastInsertRowid);
    res.json(newAnswer);
  } catch (error) {
    console.error('Post answer error:', error);
    res.status(500).json({ error: 'Failed to post answer' });
  }
});

// Chat with AI about SQL schema
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, schema } = req.body;

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: `You are an expert SQL assistant. The user has provided the following database schema:

${schema}

IMPORTANT RULES:
1. ONLY use tables and columns that exist in the schema above
2. If the user asks for data that CANNOT be retrieved with the current schema (missing tables, missing relationships, missing columns), say so IMMEDIATELY and clearly at the START of your response
3. Do NOT provide partial queries that ignore what the user asked for
4. If a query is impossible with the current schema, explain exactly what's missing and what tables/columns need to be added

When a valid query IS possible:
1. Provide the SQL query in a code block
2. Briefly explain what it does
3. Mention any optimizations if relevant

Be direct and concise. If something is missing from the schema, lead with that.`,
        messages
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return res.status(response.status).json({ 
        error: error.error?.message || 'API request failed' 
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Categorize a question
app.post('/api/categorize', async (req, res) => {
  try {
    const { question } = req.body;

    if (!ANTHROPIC_API_KEY) {
      return res.json({ category: 'Other' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 50,
        system: `You are a SQL question categorizer. Categorize the given SQL question into exactly ONE of these categories:
- Basics (SELECT, WHERE, basic syntax, data types)
- Joins (JOIN, LEFT JOIN, RIGHT JOIN, INNER JOIN, relations)
- Aggregation (GROUP BY, HAVING, COUNT, SUM, AVG, aggregate functions)
- Performance (indexes, optimization, query tuning, EXPLAIN)
- Advanced (subqueries, CTEs, window functions, recursive queries)
- DDL (CREATE, ALTER, DROP, schema design, constraints)
- Other (anything that doesn't fit above)

Respond with ONLY the category name, nothing else.`,
        messages: [{ role: 'user', content: question }]
      })
    });

    if (!response.ok) {
      return res.json({ category: 'Other' });
    }

    const data = await response.json();
    const category = data.content?.[0]?.text?.trim() || 'Other';
    const validCategories = ['Basics', 'Joins', 'Aggregation', 'Performance', 'Advanced', 'DDL', 'Other'];
    
    res.json({ 
      category: validCategories.includes(category) ? category : 'Other' 
    });
  } catch (error) {
    console.error('Categorize error:', error);
    res.json({ category: 'Other' });
  }
});

// Answer a community question with AI (per-user, not stored in DB)
app.post('/api/answer', async (req, res) => {
  try {
    const { question } = req.body;

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: `You are an expert SQL assistant helping users in a community Q&A forum.

RULES:
1. Answer the SQL question clearly and concisely
2. Include code examples where helpful
3. DO NOT ask follow-up questions like "Would you like me to explain more?" or "Do you need clarification?"
4. DO NOT offer to provide additional examples or details
5. Give a complete, self-contained answer and end there
6. If the question is unclear, make reasonable assumptions and state them briefly`,
        messages: [{ role: 'user', content: question }]
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return res.status(response.status).json({ 
        error: error.error?.message || 'API request failed' 
      });
    }

    const data = await response.json();
    const answer = data.content?.map(c => c.text || '').join('\n') || 'Could not generate answer.';
    
    res.json({ answer });
  } catch (error) {
    console.error('Answer error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`\nSQL AI Agent API running on http://localhost:${PORT}`);
  console.log(`Database: ${path.join(__dirname, 'community.db')}\n`);
});
