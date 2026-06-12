import { useState } from 'react'
import { getCompanyRecommendations } from '../services/api'

export default function CompanyRecommendations() {
  const [skills, setSkills] = useState('')
  const [cgpa, setCgpa] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleRecommend() {
    if (!skills || !cgpa) return alert('Please enter skills and CGPA!')
    setLoading(true)
    try {
      const skillList = skills.split(',').map(s => s.trim())
      const res = await getCompanyRecommendations(skillList, parseFloat(cgpa))
      setResult(res.data)
    } catch (err) {
      alert('Failed! Make sure backend is running.')
    }
    setLoading(false)
  }

  const matchColor = m => m >= 80 ? '#00b894' : m >= 60 ? '#fdcb6e' : '#e17055'
  const diffColor = { Easy: '#00b894', Medium: '#fdcb6e', Hard: '#e17055', 'Very Hard': '#d63031' }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f9ff', minHeight: '100vh' }}>

      <nav style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>🎯QuickShot Placement</h1>
        <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: 14 }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>🏢 Company Recommendations</h2>
        <p style={{ color: '#888', marginBottom: 28 }}>Enter your details to get personalized company matches</p>

        {/* Input */}
        {!result && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 8 }}>Your Skills (comma separated)</label>
                <input value={skills} onChange={e => setSkills(e.target.value)}
                  placeholder="python, java, sql, react..."
                  style={{ width: '100%', padding: '12px 16px', border: '2px solid #e8e8ff', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.border = '2px solid #6C63FF'}
                  onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 8 }}>Your CGPA</label>
                <input value={cgpa} onChange={e => setCgpa(e.target.value)}
                  placeholder="8.5" type="number" min="0" max="10" step="0.1"
                  style={{ width: '100%', padding: '12px 16px', border: '2px solid #e8e8ff', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.border = '2px solid #6C63FF'}
                  onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
                />
              </div>
            </div>
            <button onClick={handleRecommend} style={{
              width: '100%', padding: '14px',
              background: loading ? '#aaa' : 'linear-gradient(135deg,#6C63FF,#4facfe)',
              color: 'white', border: 'none', borderRadius: 10,
              fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer'
            }}>
              {loading ? '⏳ Finding matches...' : '🔍 Find My Companies'}
            </button>
          </div>
        )}

        {/* Results */}
        {result && (
          <>
            <div style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', borderRadius: 16, padding: '20px 24px', marginBottom: 24, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>Best match for you</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{result.best_match} 🎯</div>
              </div>
              <button onClick={() => setResult(null)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>
                Search Again
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
              {result.recommendations.map((c, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: 16, padding: 24,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: c.match_percentage >= 80 ? '2px solid #00b894' : '2px solid transparent',
                  opacity: c.eligible ? 1 : 0.6
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#1a1a2e' }}>{c.name}</div>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: matchColor(c.match_percentage) + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: matchColor(c.match_percentage), fontWeight: 800, fontSize: 14 }}>
                      {c.match_percentage}%
                    </div>
                  </div>

                  <div style={{ background: '#f0f0f0', borderRadius: 10, height: 8, marginBottom: 16 }}>
                    <div style={{ width: `${c.match_percentage}%`, background: matchColor(c.match_percentage), borderRadius: 10, height: 8 }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 2 }}>ROLE</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>{c.role}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 2 }}>DIFFICULTY</div>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: (diffColor[c.difficulty] || '#aaa') + '22', color: diffColor[c.difficulty] || '#aaa' }}>{c.difficulty}</span>
                    </div>
                  </div>

                  {c.missing_skills.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>MISSING SKILLS</div>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {c.missing_skills.map((s, j) => (
                          <span key={j} style={{ background: '#fff0ed', color: '#e17055', padding: '3px 8px', borderRadius: 20, fontSize: 11 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {!c.eligible && (
                    <div style={{ background: '#fff0ed', color: '#e17055', padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500 }}>
                      ⚠️ CGPA below minimum requirement
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}