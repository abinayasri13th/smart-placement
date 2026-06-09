import { useState } from 'react'
import { analyzeSkillGap } from '../services/api'

export default function SkillGap() {
  const [selectedCompany, setSelectedCompany] = useState('zoho')
  const [skills, setSkills] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const companies = ['google', 'amazon', 'microsoft', 'zoho', 'tcs', 'infosys']

  async function handleAnalyze() {
    if (!skills) return alert('Please enter your skills!')
    setLoading(true)
    try {
      const skillList = skills.split(',').map(s => s.trim())
      const res = await analyzeSkillGap(skillList, selectedCompany)
      setResult(res.data)
    } catch (err) {
      alert('Analysis failed! Make sure backend is running.')
    }
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f9ff', minHeight: '100vh' }}>

      <nav style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>🎯 PlaceAI</h1>
        <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: 14 }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>🎯 Skill Gap Analysis</h2>
        <p style={{ color: '#888', marginBottom: 28 }}>Enter your skills and select company to see what's missing</p>

        {/* Input */}
        {!result && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 8 }}>Select Company</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {companies.map(c => (
                  <button key={c} onClick={() => setSelectedCompany(c)} style={{
                    padding: '8px 16px', borderRadius: 20, border: 'none',
                    fontWeight: 600, cursor: 'pointer', fontSize: 13,
                    background: selectedCompany === c ? '#6C63FF' : '#f0f0f0',
                    color: selectedCompany === c ? 'white' : '#666'
                  }}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 8 }}>Your Skills (comma separated)</label>
              <input
                value={skills}
                onChange={e => setSkills(e.target.value)}
                placeholder="python, java, sql, react, html, css..."
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #e8e8ff', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
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
              {loading ? '⏳ Analyzing...' : '🔍 Analyze Skill Gap'}
            </button>
          </div>
        )}

        {/* Result */}
        {result && (
          <>
            {/* Match Score */}
            <div style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', borderRadius: 16, padding: '24px 28px', marginBottom: 24, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 4 }}>Your match for {result.company}</div>
                <div style={{ fontSize: 42, fontWeight: 800 }}>{result.match_percentage}%</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>
                  {result.readiness_level === 'High' ? '🟢' : result.readiness_level === 'Medium' ? '🟡' : '🔴'} {result.readiness_level} Readiness
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, opacity: 0.8 }}>Skills matched</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{result.matched_skills.length}</div>
                <div style={{ fontSize: 13, opacity: 0.8, marginTop: 8 }}>Skills missing</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#FFD700' }}>{result.missing_required_skills.length}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              {/* Have */}
              <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>✅ Skills You Have</h3>
                {result.matched_skills.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ color: '#00b894' }}>✓</span>
                    <span style={{ fontSize: 14, color: '#444' }}>{s}</span>
                  </div>
                ))}
              </div>
              {/* Missing */}
              <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>❌ Missing Skills</h3>
                {result.missing_required_skills.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ color: '#e17055' }}>✗</span>
                    <span style={{ fontSize: 14, color: '#444' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>📚 Learning Roadmap</h3>
              {result.roadmap.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6C63FF,#4facfe)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{i + 1}</div>
                  <div style={{ flex: 1, background: '#f8f9ff', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#444' }}>{step}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setResult(null)} style={{
              width: '100%', padding: '14px', background: 'white',
              color: '#6C63FF', border: '2px solid #6C63FF', borderRadius: 12,
              fontSize: 16, fontWeight: 700, cursor: 'pointer'
            }}>🔄 Analyze Again</button>
          </>
        )}
      </div>
    </div>
  )
}