import { useState } from 'react'
import { sendChatMessage } from '../services/api'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI Career Mentor 🤖 Ask me anything about placement, resume, companies, or skills!", isBot: true }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const suggestions = [
    "How to improve ATS score?",
    "What skills does Google need?",
    "How to prepare for TCS?",
    "What salary can I expect?"
  ]

  async function handleSend(message) {
    const text = message || input
    if (!text.trim()) return

    setMessages(prev => [...prev, { text, isBot: false }])
    setInput('')
    setLoading(true)

    try {
      const res = await sendChatMessage(text)
      setMessages(prev => [...prev, { text: res.data.bot_response, isBot: true }])
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Sorry, I am having trouble connecting. Please try again!', isBot: true }])
    }
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f9ff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <nav style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>🎯QuickShot Placement</h1>
        <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: 14 }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 20px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>🤖 AI Career Chatbot</h2>
        <p style={{ color: '#888', marginBottom: 20, fontSize: 14 }}>Ask me anything about placement, resume, companies, or skills!</p>

        {/* Messages */}
        <div style={{ flex: 1, background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 16, minHeight: 400, maxHeight: 500, overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.isBot ? 'flex-start' : 'flex-end', marginBottom: 16 }}>
              {msg.isBot && (
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#6C63FF,#4facfe)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, flexShrink: 0 }}>
                  🤖
                </div>
              )}
              <div style={{
                maxWidth: '70%', padding: '12px 16px', borderRadius: msg.isBot ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                background: msg.isBot ? '#f8f9ff' : 'linear-gradient(135deg,#6C63FF,#4facfe)',
                color: msg.isBot ? '#444' : 'white', fontSize: 14, lineHeight: 1.6
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#6C63FF,#4facfe)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>🤖</div>
              <div style={{ padding: '12px 16px', background: '#f8f9ff', borderRadius: '4px 16px 16px 16px', fontSize: 14, color: '#888' }}>Typing...</div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => handleSend(s)} style={{
              padding: '6px 14px', background: '#f0eeff', color: '#6C63FF',
              border: 'none', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer'
            }}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            style={{ flex: 1, padding: '14px 16px', border: '2px solid #e8e8ff', borderRadius: 12, fontSize: 14, outline: 'none' }}
            onFocus={e => e.target.style.border = '2px solid #6C63FF'}
            onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
          />
          <button onClick={() => handleSend()} style={{
            padding: '14px 24px', background: 'linear-gradient(135deg,#6C63FF,#4facfe)',
            color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 16
          }}>Send →</button>
        </div>
      </div>
    </div>
  )
}