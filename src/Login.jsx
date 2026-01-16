import React, { useState, useEffect, useRef } from 'react';

const Login = ({ onLogin }) => {
  const canvasRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // SQL statements for the falling animation - extensive variety
  const sqlStatements = [
    // SELECT variations
    'SELECT * FROM users',
    'SELECT id, name FROM',
    'SELECT DISTINCT email',
    'SELECT COUNT(*) FROM',
    'SELECT MAX(price)',
    'SELECT MIN(created_at)',
    'SELECT AVG(rating)',
    'SELECT SUM(total)',
    // JOINs
    'INNER JOIN orders ON',
    'LEFT JOIN products',
    'RIGHT JOIN customers',
    'FULL OUTER JOIN',
    'CROSS JOIN inventory',
    'NATURAL JOIN sales',
    'JOIN users USING (id)',
    // WHERE clauses
    'WHERE status = active',
    'WHERE price > 100',
    'WHERE email LIKE %',
    'WHERE id IN (1,2,3)',
    'WHERE NOT EXISTS',
    'WHERE date BETWEEN',
    'WHERE name IS NULL',
    'WHERE age >= 18',
    // GROUP BY & ORDER BY
    'GROUP BY category',
    'GROUP BY user_id',
    'ORDER BY created_at',
    'ORDER BY price DESC',
    'ORDER BY name ASC',
    'HAVING COUNT(*) > 5',
    'HAVING SUM(qty) > 0',
    // INSERT
    'INSERT INTO users',
    'INSERT INTO orders',
    'VALUES (1, "test")',
    'INSERT SELECT FROM',
    // UPDATE
    'UPDATE users SET',
    'UPDATE orders WHERE',
    'SET status = done',
    'SET price = price * 1.1',
    // DELETE
    'DELETE FROM temp',
    'DELETE WHERE id = 5',
    'TRUNCATE TABLE logs',
    // CREATE
    'CREATE TABLE users',
    'CREATE INDEX idx_name',
    'CREATE VIEW v_sales',
    'CREATE DATABASE shop',
    'CREATE TRIGGER audit',
    // ALTER
    'ALTER TABLE ADD col',
    'ALTER COLUMN SET',
    'DROP COLUMN temp',
    'RENAME TO new_name',
    // Constraints
    'PRIMARY KEY (id)',
    'FOREIGN KEY (uid)',
    'REFERENCES users(id)',
    'ON DELETE CASCADE',
    'ON UPDATE SET NULL',
    'UNIQUE (email)',
    'NOT NULL DEFAULT 0',
    'CHECK (price > 0)',
    // Subqueries
    'EXISTS (SELECT 1)',
    '(SELECT MAX(id))',
    'IN (SELECT uid)',
    'ANY (SELECT price)',
    'ALL (SELECT qty)',
    // Window functions
    'ROW_NUMBER() OVER',
    'RANK() OVER (ORDER',
    'DENSE_RANK() OVER',
    'LAG(price) OVER',
    'LEAD(date) OVER',
    'PARTITION BY user',
    'SUM() OVER (ROWS',
    // CTEs
    'WITH cte AS (SELECT',
    'WITH RECURSIVE tree',
    // Transactions
    'BEGIN TRANSACTION',
    'COMMIT',
    'ROLLBACK',
    'SAVEPOINT sp1',
    // Functions
    'COALESCE(a, b, c)',
    'NULLIF(a, b)',
    'CAST(id AS VARCHAR)',
    'CONVERT(date, 101)',
    'CONCAT(first, last)',
    'SUBSTRING(name, 1)',
    'UPPER(email)',
    'LOWER(name)',
    'TRIM(description)',
    'LENGTH(content)',
    'ROUND(price, 2)',
    'NOW()',
    'CURDATE()',
    'DATE_ADD(date, 7)',
    'DATEDIFF(end, start)',
    'YEAR(created_at)',
    'MONTH(order_date)',
    // CASE
    'CASE WHEN x THEN y',
    'CASE status WHEN',
    'ELSE default END',
    // Misc
    'LIMIT 100 OFFSET 0',
    'FETCH FIRST 10',
    'UNION ALL SELECT',
    'INTERSECT SELECT',
    'EXCEPT SELECT',
    'EXPLAIN ANALYZE',
    'VACUUM ANALYZE',
    'GRANT SELECT ON',
    'REVOKE INSERT FROM',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class for floating SQL statements
    class SQLParticle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = sqlStatements[Math.floor(Math.random() * sqlStatements.length)];
        this.fontSize = 11 + Math.random() * 6;
        this.opacity = 0;
        this.targetOpacity = 0.15 + Math.random() * 0.4;
        this.fadeIn = true;
        this.lifetime = 200 + Math.random() * 300;
        this.age = 0;
        
        // Movement
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        // Drift (slight curve)
        this.drift = (Math.random() - 0.5) * 0.01;
        
        // Color
        const colors = [
          { r: 100, g: 255, b: 218 }, // Teal
          { r: 167, g: 139, b: 250 }, // Purple
          { r: 96, g: 165, b: 250 },  // Blue
          { r: 244, g: 114, b: 182 }, // Pink
          { r: 52, g: 211, b: 153 },  // Green
          { r: 251, g: 191, b: 36 },  // Yellow
          { r: 248, g: 113, b: 113 }, // Red
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Glow
        this.glowSize = 2 + Math.random() * 4;
      }
      
      update() {
        this.age++;
        
        // Fade in
        if (this.fadeIn) {
          this.opacity += 0.02;
          if (this.opacity >= this.targetOpacity) {
            this.opacity = this.targetOpacity;
            this.fadeIn = false;
          }
        }
        
        // Fade out near end of life
        if (this.age > this.lifetime - 50) {
          this.opacity -= 0.02;
        }
        
        // Movement with drift
        this.vx += this.drift;
        this.x += this.vx;
        this.y += this.vy;
        
        // Slight floating effect
        this.y += Math.sin(this.age * 0.02) * 0.3;
        
        // Reset if off screen or dead
        if (this.age > this.lifetime || 
            this.x < -200 || this.x > canvas.width + 200 ||
            this.y < -50 || this.y > canvas.height + 50) {
          this.reset();
        }
      }
      
      draw(ctx) {
        if (this.opacity <= 0) return;
        
        ctx.save();
        
        // Glow effect
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.shadowBlur = this.glowSize;
        
        ctx.font = `${this.fontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
        
        ctx.restore();
      }
    }
    
    // Create particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
    const particles = [];
    for (let i = 0; i < Math.max(particleCount, 30); i++) {
      const p = new SQLParticle();
      p.age = Math.random() * 200; // Stagger initial ages
      particles.push(p);
    }
    
    // Floating keywords in center (larger, slower)
    const keywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'WHERE', 'FROM', 'CREATE', 'ALTER', 'DROP'];
    class KeywordParticle {
      constructor() {
        this.reset();
      }
      
      reset() {
        // Spawn around edges, float toward center area
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { this.x = -100; this.y = Math.random() * canvas.height; }
        else if (side === 1) { this.x = canvas.width + 100; this.y = Math.random() * canvas.height; }
        else if (side === 2) { this.x = Math.random() * canvas.width; this.y = -50; }
        else { this.x = Math.random() * canvas.width; this.y = canvas.height + 50; }
        
        this.text = keywords[Math.floor(Math.random() * keywords.length)];
        this.fontSize = 24 + Math.random() * 16;
        this.opacity = 0;
        this.targetOpacity = 0.08 + Math.random() * 0.12;
        
        // Move toward center-ish area
        const targetX = canvas.width * (0.2 + Math.random() * 0.6);
        const targetY = canvas.height * (0.2 + Math.random() * 0.6);
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        const speed = 0.3 + Math.random() * 0.4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.lifetime = 400 + Math.random() * 200;
        this.age = 0;
        
        // Subtle color
        this.color = { r: 100, g: 255, b: 218 };
      }
      
      update() {
        this.age++;
        
        if (this.age < 100) {
          this.opacity = Math.min(this.opacity + 0.005, this.targetOpacity);
        } else if (this.age > this.lifetime - 100) {
          this.opacity -= 0.005;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Slow down as it approaches center
        this.vx *= 0.995;
        this.vy *= 0.995;
        
        if (this.age > this.lifetime || this.opacity <= 0) {
          this.reset();
        }
      }
      
      draw(ctx) {
        if (this.opacity <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `bold ${this.fontSize}px "Space Grotesk", sans-serif`;
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
        ctx.shadowBlur = 20;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }
    
    const keywordParticles = [];
    for (let i = 0; i < 6; i++) {
      const kp = new KeywordParticle();
      kp.age = Math.random() * 300;
      keywordParticles.push(kp);
    }
    
    // Connection lines between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.1 * Math.min(particles[i].opacity, particles[j].opacity);
            ctx.strokeStyle = `rgba(100, 255, 218, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const draw = () => {
      // Clear with slight fade for trail effect
      ctx.fillStyle = 'rgba(10, 15, 28, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (behind text)
      drawConnections();
      
      // Update and draw keyword particles (background)
      for (const kp of keywordParticles) {
        kp.update();
        kp.draw(ctx);
      }
      
      // Update and draw SQL particles
      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleGoogleLogin = () => {
    // For demo, create a user with Google-like name
    const googleUser = 'User_' + Math.random().toString(36).substr(2, 8);
    localStorage.setItem('sql_agent_user', googleUser);
    localStorage.setItem('sql_agent_auth', 'google');
    onLogin(googleUser);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    const userName = isSignUp && name.trim() ? name.trim() : email.split('@')[0];
    localStorage.setItem('sql_agent_user', userName);
    localStorage.setItem('sql_agent_auth', 'email');
    localStorage.setItem('sql_agent_email', email);
    onLogin(userName);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1f3c 50%, #0d1224 100%)',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@700&display=swap');
        
        * { box-sizing: border-box; }
        
        input:focus { outline: none; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Falling SQL Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 15, 28, 0.8) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Login Card */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '420px',
        padding: '20px',
        animation: 'slideUp 0.6s ease'
      }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          padding: '40px',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 0 100px rgba(100, 255, 218, 0.1)'
        }}>
          {/* Logo */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #64ffda 0%, #a78bfa 50%, #f472b6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'float 3s ease-in-out infinite'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
            <h1 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #64ffda 0%, #a78bfa 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              SQL AI Agent
            </h1>
            <p style={{
              color: '#64748b',
              marginTop: '8px',
              fontSize: '14px'
            }}>
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#1f2937',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.2s',
              fontFamily: '"DM Sans", sans-serif'
            }}
            onMouseOver={(e) => e.target.style.background = '#f3f4f6'}
            onMouseOut={(e) => e.target.style.background = '#ffffff'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '24px 0',
            gap: '16px'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(100, 255, 218, 0.2)' }} />
            <span style={{ color: '#64748b', fontSize: '13px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(100, 255, 218, 0.2)' }} />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailLogin}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#e2e8f0',
                  marginBottom: '12px',
                  fontFamily: '"DM Sans", sans-serif'
                }}
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#e2e8f0',
                marginBottom: '12px',
                fontFamily: '"DM Sans", sans-serif'
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#e2e8f0',
                marginBottom: '20px',
                fontFamily: '"DM Sans", sans-serif'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #64ffda 0%, #0ea5e9 100%)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#0f172a',
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                transition: 'all 0.2s'
              }}
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            color: '#64748b',
            fontSize: '14px'
          }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                background: 'none',
                border: 'none',
                color: '#64ffda',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: '"DM Sans", sans-serif'
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#475569',
          fontSize: '12px'
        }}>
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default Login;
