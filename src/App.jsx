import React, { useState, useEffect } from 'react';
import Login from './Login';

// SVG Icons as components
const Icons = {
  Database: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  Bot: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8" y2="16"/>
      <line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  MessageCircle: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  ),
  Inbox: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Sparkles: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
      <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z"/>
    </svg>
  ),
  Book: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Link: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
  Zap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Rocket: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  Layers: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
    </svg>
  ),
  Grid: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Check: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  AlertCircle: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  Eye: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  ChevronUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
};

const SQLAIAgent = ({ currentUserProp, onLogout }) => {
  const [schema, setSchema] = useState(`CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255),
  created_at TIMESTAMP
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total DECIMAL(10,2),
  status VARCHAR(50),
  order_date DATE
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(200),
  price DECIMAL(10,2),
  category VARCHAR(100)
);`);
  
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [communityQuestions, setCommunityQuestions] = useState([]);
  const [newCommunityQuestion, setNewCommunityQuestion] = useState('');
  const currentUser = currentUserProp;
  const [answeringId, setAnsweringId] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategorizingQuestion, setIsCategorizingQuestion] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [myAIAnswers, setMyAIAnswers] = useState(() => {
    // Load user's personal AI answers from localStorage
    const saved = localStorage.getItem(`ai_answers_${currentUser}`);
    return saved ? JSON.parse(saved) : {};
  });

  const categories = [
    { id: 'All', label: 'All Questions', Icon: Icons.Grid, color: '#64ffda' },
    { id: 'Basics', label: 'SQL Basics', Icon: Icons.Book, color: '#60a5fa' },
    { id: 'Joins', label: 'Joins & Relations', Icon: Icons.Link, color: '#a78bfa' },
    { id: 'Aggregation', label: 'Aggregation', Icon: Icons.BarChart, color: '#f472b6' },
    { id: 'Performance', label: 'Performance', Icon: Icons.Zap, color: '#fbbf24' },
    { id: 'Advanced', label: 'Advanced', Icon: Icons.Rocket, color: '#34d399' },
    { id: 'DDL', label: 'Schema & DDL', Icon: Icons.Layers, color: '#fb923c' },
    { id: 'Other', label: 'Other', Icon: Icons.Lightbulb, color: '#94a3b8' }
  ];

  useEffect(() => {
    checkServerHealth();
    loadCommunityQuestions();
  }, []);

  const checkServerHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setServerStatus(data.hasApiKey ? 'ready' : 'no-key');
    } catch {
      setServerStatus('offline');
    }
  };

  const loadCommunityQuestions = async () => {
    try {
      const res = await fetch('/api/questions');
      if (res.ok) {
        const questions = await res.json();
        setCommunityQuestions(questions);
      }
    } catch (e) {
      console.log('Failed to load questions:', e);
    }
  };

  const loadAnswers = async (questionId) => {
    try {
      const res = await fetch(`/api/questions/${questionId}/answers`);
      if (res.ok) {
        const answers = await res.json();
        setQuestionAnswers(prev => ({ ...prev, [questionId]: answers }));
      }
    } catch (e) {
      console.log('Failed to load answers:', e);
    }
  };

  const toggleQuestion = (questionId) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionId);
      if (!questionAnswers[questionId]) {
        loadAnswers(questionId);
      }
    }
  };

  const askAI = async (q) => {
    if (!q.trim() || !schema.trim()) return;
    
    const newQuestion = { role: 'user', content: q };
    setConversation(prev => [...prev, newQuestion]);
    setQuestion('');

    // Check server status before making request
    if (serverStatus === 'offline') {
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: 'Server is offline. Please make sure the backend is running with `npm run dev`.' 
      }]);
      return;
    }
    
    if (serverStatus === 'no-key') {
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: 'API key not configured. Please add your Anthropic API key to the `.env` file:\n\n```\nANTHROPIC_API_KEY=sk-ant-api03-your-key-here\n```\n\nGet your key from: https://console.anthropic.com/settings/keys\n\nThen restart the server with `npm run dev`.' 
      }]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schema,
          messages: [
            ...conversation.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: q }
          ]
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      const aiResponse = data.content?.map(c => c.text || '').join('\n') || 'Sorry, I could not process that request.';
      setConversation(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setConversation(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    }
    
    setIsLoading(false);
  };

  const postCommunityQuestion = async () => {
    if (!newCommunityQuestion.trim()) return;
    
    setIsCategorizingQuestion(true);
    
    let category = 'Other';
    try {
      const response = await fetch('/api/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newCommunityQuestion })
      });
      const data = await response.json();
      category = data.category || 'Other';
    } catch {
      category = 'Other';
    }
    
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newCommunityQuestion,
          author: currentUser,
          category
        })
      });
      
      if (response.ok) {
        await loadCommunityQuestions();
      }
    } catch (e) {
      console.log('Failed to post question:', e);
    }
    
    setNewCommunityQuestion('');
    setIsCategorizingQuestion(false);
  };

  const submitUserAnswer = async (questionId) => {
    if (!userAnswer.trim()) return;
    
    try {
      const response = await fetch(`/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: userAnswer,
          author: currentUser,
          is_ai: false
        })
      });
      
      if (response.ok) {
        await loadAnswers(questionId);
        await loadCommunityQuestions();
      }
    } catch (e) {
      console.log('Failed to post answer:', e);
    }
    
    setUserAnswer('');
    setAnsweringId(null);
  };

  const askAIForCommunity = async (questionId, questionText) => {
    if (serverStatus !== 'ready') return;
    
    // Check if user already has an AI answer for this question
    if (myAIAnswers[questionId]) {
      return; // Already answered
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText })
      });

      const data = await response.json();
      
      if (response.ok && data.answer) {
        // Store AI answer locally for this user only
        const newAIAnswers = {
          ...myAIAnswers,
          [questionId]: {
            answer: data.answer,
            timestamp: Date.now()
          }
        };
        setMyAIAnswers(newAIAnswers);
        localStorage.setItem(`ai_answers_${currentUser}`, JSON.stringify(newAIAnswers));
        
        // Expand the question to show the answer
        if (expandedQuestion !== questionId) {
          toggleQuestion(questionId);
        }
      }
    } catch (error) {
      console.error('AI error:', error);
    }
    
    setIsLoading(false);
  };

  const formatMessage = (content) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith('```')) {
        const code = part.replace(/```\w*\n?/g, '').replace(/```$/g, '');
        return (
          <pre key={i} style={{
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '8px',
            padding: '16px',
            overflow: 'auto',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '13px',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            margin: '12px 0'
          }}>
            <code style={{ color: '#64ffda' }}>{code}</code>
          </pre>
        );
      }
      return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
    });
  };

  const timeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getCategoryColor = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.color : '#94a3b8';
  };

  const getCategoryIcon = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.Icon : Icons.Lightbulb;
  };

  const filteredQuestions = selectedCategory === 'All' 
    ? communityQuestions 
    : communityQuestions.filter(q => q.category === selectedCategory);

  const getCategoryCounts = () => {
    const counts = { All: communityQuestions.length };
    categories.forEach(cat => {
      if (cat.id !== 'All') {
        counts[cat.id] = communityQuestions.filter(q => q.category === cat.id).length;
      }
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'ready': return '#64ffda';
      case 'no-key': return '#fbbf24';
      case 'offline': return '#f87171';
      default: return '#94a3b8';
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'ready': return 'AI Ready';
      case 'no-key': return 'API Key Missing';
      case 'offline': return 'Server Offline';
      default: return 'Checking...';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1f3c 50%, #0d1224 100%)',
      fontFamily: '"DM Sans", system-ui, sans-serif',
      color: '#e2e8f0',
      padding: '24px'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@700&display=swap');
        
        * { box-sizing: border-box; }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(100, 255, 218, 0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(100, 255, 218, 0.5); }
        
        textarea:focus, input:focus { outline: none; }
        
        @keyframes pulse { 
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <header style={{
        textAlign: 'center',
        marginBottom: '32px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '100px',
          background: 'radial-gradient(ellipse, rgba(100, 255, 218, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />
        <h1 style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '42px',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #64ffda 0%, #a78bfa 50%, #f472b6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          letterSpacing: '-1px'
        }}>
          SQL AI Agent
        </h1>
        <p style={{
          color: '#64748b',
          marginTop: '8px',
          fontSize: '15px'
        }}>
          Paste your schema, ask questions, learn from the community
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '12px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'rgba(100, 255, 218, 0.1)',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#64ffda'
          }}>
            <Icons.User />
            {currentUser}
          </div>
          <button
            onClick={onLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: 'rgba(248, 113, 113, 0.1)',
              border: '1px solid rgba(248, 113, 113, 0.2)',
              borderRadius: '20px',
              fontSize: '13px',
              color: '#f87171',
              cursor: 'pointer'
            }}
          >
            <Icons.LogOut />
            Logout
          </button>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: `${getStatusColor()}15`,
            border: `1px solid ${getStatusColor()}30`,
            borderRadius: '20px',
            fontSize: '13px',
            color: getStatusColor()
          }}>
            {serverStatus === 'ready' ? <Icons.Check /> : <Icons.AlertCircle />}
            {getStatusText()}
          </div>
        </div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr 1.1fr',
        gap: '24px',
        maxWidth: '1800px',
        margin: '0 auto',
        height: 'calc(100vh - 200px)',
        minHeight: '500px'
      }}>
        {/* Column 1: Schema */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(100, 255, 218, 0.1)',
          padding: '24px',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #64ffda 0%, #0ea5e9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a'
            }}>
              <Icons.Database />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Database Schema</h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Paste your CREATE TABLE statements</p>
            </div>
          </div>
          
          <textarea
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            placeholder="Paste your SQL schema here..."
            style={{
              width: '100%',
              flex: 1,
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(100, 255, 218, 0.15)',
              borderRadius: '12px',
              padding: '16px',
              color: '#64ffda',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '13px',
              lineHeight: 1.6,
              resize: 'none'
            }}
          />
        </div>

        {/* Column 2: AI Chat */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(167, 139, 250, 0.2)',
          padding: '24px',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a'
            }}>
              <Icons.Bot />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>AI Assistant</h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Ask questions about your schema</p>
            </div>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '16px',
            padding: '4px',
            minHeight: 0
          }}>
            {conversation.length === 0 ? (
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                textAlign: 'center',
                padding: '40px'
              }}>
                <div style={{ marginBottom: '16px', opacity: 0.5 }}>
                  <Icons.MessageCircle />
                </div>
                <p style={{ margin: 0, fontSize: '14px' }}>Ask me anything about your database schema!</p>
                <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#334155' }}>
                  Try: "Write a query to get all users with their order totals"
                </p>
              </div>
            ) : (
              conversation.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: '16px',
                    animation: 'slideIn 0.3s ease',
                    animationDelay: `${i * 0.05}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: msg.role === 'user' 
                        ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                        : 'linear-gradient(135deg, #64ffda 0%, #0ea5e9 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0f172a',
                      flexShrink: 0
                    }}>
                      {msg.role === 'user' ? <Icons.User /> : <Icons.Bot />}
                    </div>
                    <div style={{
                      flex: 1,
                      background: msg.role === 'user'
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(100, 255, 218, 0.05)',
                      borderRadius: '12px',
                      padding: '14px 16px',
                      border: `1px solid ${msg.role === 'user' 
                        ? 'rgba(59, 130, 246, 0.2)' 
                        : 'rgba(100, 255, 218, 0.1)'}`,
                      fontSize: '14px',
                      lineHeight: 1.6
                    }}>
                      {formatMessage(msg.content)}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #64ffda 0%, #0ea5e9 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f172a'
                }}>
                  <Icons.Bot />
                </div>
                <div style={{
                  display: 'flex',
                  gap: '6px'
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#64ffda',
                      animation: 'pulse 1s infinite',
                      animationDelay: `${i * 0.15}s`
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && askAI(question)}
              placeholder={serverStatus !== 'ready' ? 'Configure API key to enable AI...' : 'Ask about your schema...'}
              style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                borderRadius: '12px',
                padding: '14px 18px',
                color: '#e2e8f0',
                fontSize: '14px'
              }}
            />
            <button
              onClick={() => askAI(question)}
              disabled={isLoading || !question.trim()}
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 20px',
                color: '#0f172a',
                fontWeight: 600,
                cursor: isLoading || !question.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !question.trim() ? 0.5 : 1,
                transition: 'all 0.2s',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Icons.Send />
              Send
            </button>
          </div>
        </div>

        {/* Column 3: Community */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(244, 114, 182, 0.15)',
          padding: '24px',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a'
            }}>
              <Icons.Users />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Community Q&A</h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Questions are shared with everyone</p>
            </div>
          </div>

          {/* Post Question Input */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '16px'
          }}>
            <input
              type="text"
              value={newCommunityQuestion}
              onChange={(e) => setNewCommunityQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isCategorizingQuestion && postCommunityQuestion()}
              placeholder="Post a question for everyone..."
              disabled={isCategorizingQuestion}
              style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(244, 114, 182, 0.2)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#e2e8f0',
                fontSize: '13px',
                opacity: isCategorizingQuestion ? 0.6 : 1
              }}
            />
            <button
              onClick={postCommunityQuestion}
              disabled={isCategorizingQuestion || !newCommunityQuestion.trim()}
              style={{
                background: 'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 18px',
                color: '#0f172a',
                fontWeight: 600,
                cursor: isCategorizingQuestion || !newCommunityQuestion.trim() ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: isCategorizingQuestion || !newCommunityQuestion.trim() ? 0.7 : 1
              }}
            >
              {isCategorizingQuestion ? (
                <>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '14px', 
                    height: '14px', 
                    border: '2px solid #0f172a',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  Posting...
                </>
              ) : 'Post'}
            </button>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px',
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '12px'
          }}>
            {categories.map(cat => {
              const CatIcon = cat.Icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    background: selectedCategory === cat.id 
                      ? `${cat.color}20` 
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${selectedCategory === cat.id ? cat.color : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: selectedCategory === cat.id ? cat.color : '#94a3b8',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                    fontWeight: selectedCategory === cat.id ? 600 : 400
                  }}
                >
                  <CatIcon />
                  <span>{cat.label}</span>
                  {categoryCounts[cat.id] > 0 && (
                    <span style={{
                      background: selectedCategory === cat.id ? cat.color : 'rgba(255,255,255,0.1)',
                      color: selectedCategory === cat.id ? '#0f172a' : '#94a3b8',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontSize: '10px',
                      fontWeight: 600
                    }}>
                      {categoryCounts[cat.id]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Questions List */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            minHeight: 0
          }}>
            {filteredQuestions.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#475569'
              }}>
                <div style={{ marginBottom: '12px', opacity: 0.5 }}>
                  <Icons.Inbox />
                </div>
                <p style={{ margin: 0, fontSize: '13px' }}>No questions in this category yet</p>
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#334155' }}>Be the first to ask!</p>
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const CatIcon = getCategoryIcon(q.category);
                const answers = questionAnswers[q.id] || [];
                const isExpanded = expandedQuestion === q.id;
                
                return (
                  <div
                    key={q.id}
                    style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '12px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      animation: 'slideIn 0.3s ease'
                    }}
                  >
                    {/* Category Badge */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      background: `${getCategoryColor(q.category)}15`,
                      border: `1px solid ${getCategoryColor(q.category)}30`,
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: getCategoryColor(q.category),
                      marginBottom: '10px',
                      fontWeight: 500
                    }}>
                      <CatIcon />
                      <span>{q.category}</span>
                    </div>

                    <p style={{
                        margin: '0 0 10px 0',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#f1f5f9',
                        lineHeight: 1.4
                      }}
                    >
                      {q.question}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '11px',
                      color: '#64748b',
                      marginBottom: '12px'
                    }}>
                      <span>by {q.author}</span>
                      <span>•</span>
                      <span>{timeAgo(q.created_at)}</span>
                      <span>•</span>
                      <span>{q.answer_count || 0} answers</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: isExpanded ? '12px' : 0 }}>
                      {(q.answer_count > 0 || answers.length > 0 || myAIAnswers[q.id]) && (
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          style={{
                            background: isExpanded ? 'rgba(251, 191, 36, 0.15)' : 'rgba(251, 191, 36, 0.1)',
                            border: `1px solid ${isExpanded ? 'rgba(251, 191, 36, 0.4)' : 'rgba(251, 191, 36, 0.2)'}`,
                            borderRadius: '6px',
                            padding: '6px 12px',
                            color: '#fbbf24',
                            fontSize: '11px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {isExpanded ? <Icons.ChevronUp /> : <Icons.Eye />}
                          {isExpanded ? 'Hide Answers' : `View Answers (${(q.answer_count || 0) + (myAIAnswers[q.id] ? 1 : 0)})`}
                        </button>
                      )}
                      <button
                        onClick={() => askAIForCommunity(q.id, q.question)}
                        disabled={isLoading || serverStatus !== 'ready' || myAIAnswers[q.id]}
                        style={{
                          background: myAIAnswers[q.id] ? 'rgba(100, 255, 218, 0.2)' : 'rgba(100, 255, 218, 0.1)',
                          border: `1px solid ${myAIAnswers[q.id] ? 'rgba(100, 255, 218, 0.4)' : 'rgba(100, 255, 218, 0.2)'}`,
                          borderRadius: '6px',
                          padding: '6px 12px',
                          color: '#64ffda',
                          fontSize: '11px',
                          cursor: isLoading || serverStatus !== 'ready' || myAIAnswers[q.id] ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          opacity: isLoading || serverStatus !== 'ready' ? 0.6 : 1
                        }}
                      >
                        <Icons.Sparkles /> {myAIAnswers[q.id] ? 'AI Answered' : 'Ask AI'}
                      </button>
                      <button
                        onClick={() => {
                          if (!isExpanded) toggleQuestion(q.id);
                          setAnsweringId(answeringId === q.id ? null : q.id);
                        }}
                        style={{
                          background: 'rgba(167, 139, 250, 0.1)',
                          border: '1px solid rgba(167, 139, 250, 0.2)',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          color: '#a78bfa',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Icons.Edit /> Answer
                      </button>
                    </div>

                    {isExpanded && answeringId === q.id && (
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '12px',
                        animation: 'slideIn 0.2s ease'
                      }}>
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && submitUserAnswer(q.id)}
                          placeholder="Write your answer..."
                          style={{
                            flex: 1,
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid rgba(167, 139, 250, 0.2)',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            color: '#e2e8f0',
                            fontSize: '12px'
                          }}
                        />
                        <button
                          onClick={() => submitUserAnswer(q.id)}
                          style={{
                            background: '#a78bfa',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 16px',
                            color: '#0f172a',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}

                    {isExpanded && (answers.filter(a => !a.is_ai).length > 0 || myAIAnswers[q.id]) && (
                      <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        paddingTop: '12px'
                      }}>
                        {/* Show user's personal AI answer first */}
                        {myAIAnswers[q.id] && (
                          <div
                            style={{
                              background: 'rgba(100, 255, 218, 0.05)',
                              borderRadius: '8px',
                              padding: '10px 12px',
                              marginBottom: '8px',
                              border: '1px solid rgba(100, 255, 218, 0.1)'
                            }}
                          >
                            <div style={{
                              fontSize: '11px',
                              color: '#64ffda',
                              marginBottom: '6px',
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Icons.Sparkles />
                              AI Answer (for you)
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: '#cbd5e1',
                              lineHeight: 1.5,
                              whiteSpace: 'pre-wrap'
                            }}>
                              {formatMessage(myAIAnswers[q.id].answer)}
                            </div>
                          </div>
                        )}
                        {/* Show human answers from community (excluding AI answers from DB) */}
                        {answers.filter(a => !a.is_ai).map((a) => (
                          <div
                            key={a.id}
                            style={{
                              background: 'rgba(167, 139, 250, 0.05)',
                              borderRadius: '8px',
                              padding: '10px 12px',
                              marginBottom: '8px',
                              border: '1px solid rgba(167, 139, 250, 0.1)'
                            }}
                          >
                            <div style={{
                              fontSize: '11px',
                              color: '#a78bfa',
                              marginBottom: '6px',
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Icons.User />
                              {a.author}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: '#cbd5e1',
                              lineHeight: 1.5,
                              whiteSpace: 'pre-wrap'
                            }}>
                              {formatMessage(a.answer)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component with Login
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('sql_agent_auth');
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('sql_agent_user') || '';
  });

  const handleLogin = (userName) => {
    setCurrentUser(userName);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('sql_agent_auth');
    localStorage.removeItem('sql_agent_user');
    localStorage.removeItem('sql_agent_email');
    setIsLoggedIn(false);
    setCurrentUser('');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <SQLAIAgent currentUserProp={currentUser} onLogout={handleLogout} />;
};

export default App;
