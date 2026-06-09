import { useState, useEffect } from 'react'
import { analyzeATS } from '../services/api'

export default function ATSScore() {
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resumeText, setResumeText] = useState('')
  const [company, setCompany] = useState('google')

  const companies = ['google', 'amazon', 'microsoft', 'zoho', 'tcs', 'infosys']

  async function handleAnalyze() {
    if (!resumeText) return alert('Please paste your resume text!')
    setLoading(true)
    try {
      const res = await analyzeATS(resumeText, company)
      setResult(res.data)
      animateScore(res.data.ats_score)
    } catch (err) {
      alert('Analysis failed! Make sure backend is running.')
    }
    setLoading(false)
  }

  function animateScore(target) {
    let count = 0
    const timer = setInterval(() => {
      count += 1
      setScore(count)
      if (count >= target) clearInterval(timer)
    }, 20)
  }

  const color = score >= 80 ? '#00b894' : score >= 60 ? '#fdcb6e' : '#e17055'

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f9ff', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>🎯 PlaceAI</h1>
        <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: 14 }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>📊 ATS Score Analysis</h2>
        <p style={{ color: '#888', marginBottom: 32 }}>Paste your resume text and select company to get AI score</p>

        {/* Input Section */}
        {!result && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24 }}>

            {/* Company Selector */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 8 }}>Select Target Company</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {companies.map(c => (
                  <button key={c} onClick={() => setCompany(c)} style={{
                    padding: '8px 16px', borderRadius: 20, border: 'none',
                    fontWeight: 600, cursor: 'pointer', fontSize: 13,
                    background: company === c ? '#6C63FF' : '#f0f0f0',
                    color: company === c ? 'white' : '#666'
                  }}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
                ))}
              </div>
            </div>

            {/* Resume Text */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 8 }}>Paste Your Resume Text</label>
              <textarea
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste your resume content here... Include your skills, experience, education, projects etc."
                rows={8}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #e8e8ff', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                onFocus={e => e.target.style.border = '2px solid #6C63FF'}
                onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
              />
            </div>

            <button onClick={handleAnalyze} style={{
              width: '100%', padding: '14px',
              background: loading ? '#aaa' : 'linear-gradient(135deg,#6C63FF,#4facfe)',
              color: 'white', border: 'none', borderRadius: 10,
              fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer'
            }}>
              {loading ? '⏳ Analyzing...' : '🔍 Analyze My Resume'}
            </button>
          </div>
        )}

        {/* Result Section */}
        {result && (
          <>
            {/* Score Card */}
            <div style={{ background: 'white', borderRadius: 20, padding: '40px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24 }}>
              <div style={{ width: 160, height: 160, borderRadius: '50%', border: `10px solid ${color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: `0 0 30px ${color}33` }}>
                <div style={{ fontSize: 48, fontWeight: 800, color, lineHeight: 1 }}>{score}</div>
                <div style={{ fontSize: 14, color: '#888' }}>out of 100</div>
              </div>
              <div style={{ display: 'inline-block', padding: '6px 20px', background: color + '22', borderRadius: 20, color, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                Grade {result.grade}
              </div>
              <p style={{ color: '#888', fontSize: 14 }}>{result.message}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              {/* Matched */}
              <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>✅ Matched Keywords</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {result.matched_keywords.map((k, i) => (
                    <span key={i} style={{ background: '#e8faf5', color: '#00b894', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{k}</span>
                  ))}
                </div>
              </div>
              {/* Missing */}
              <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>❌ Missing Keywords</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {result.missing_keywords.map((k, i) => (
                    <span key={i} style={{ background: '#fff0ed', color: '#e17055', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{k}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>💡 Improvement Suggestions</h3>
              {result.suggestions.map((s, i) => (
                <div key={i} style={{ padding: '12px 16px', background: '#f8f9ff', borderRadius: 10, marginBottom: 8, fontSize: 14, color: '#444' }}>✅ {s}</div>
              ))}
            </div>

            {/* Try Again */}
            <button onClick={() => { setResult(null); setScore(0) }} style={{
              width: '100%', padding: '14px', background: 'white',
              color: '#6C63FF', border: '2px solid #6C63FF', borderRadius: 12,
              fontSize: 16, fontWeight: 700, cursor: 'pointer'
            }}>
              🔄 Analyze Again
            </button>
          </>
        )}
      </div>
    </div>
  )
}