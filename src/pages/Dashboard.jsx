import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const stats = [
    { icon: '📊', label: 'ATS Score', value: '78/100', color: '#6C63FF', bg: '#f0eeff' },
    { icon: '🎯', label: 'Placement Chance', value: '82%', color: '#00b894', bg: '#e8faf5' },
    { icon: '💰', label: 'Expected Salary', value: '8.5 LPA', color: '#e17055', bg: '#fff0ed' },
    { icon: '🏢', label: 'Company Matches', value: '4/6', color: '#0984e3', bg: '#e8f4ff' },
  ]

  const companies = [
    { name: 'Zoho', match: 91, color: '#e84393' },
    { name: 'TCS', match: 87, color: '#00b894' },
    { name: 'Infosys', match: 79, color: '#6C63FF' },
    { name: 'Amazon', match: 65, color: '#e17055' },
    { name: 'Microsoft', match: 58, color: '#0984e3' },
    { name: 'Google', match: 45, color: '#fdcb6e' },
  ]

  const skills = [
    { name: 'Python', have: true },
    { name: 'SQL', have: true },
    { name: 'React', have: true },
    { name: 'Machine Learning', have: false },
    { name: 'System Design', have: false },
    { name: 'Docker', have: false },
  ]

  const quickActions = [
    { label: '📄 Upload Resume', color: '#6C63FF', path: '/resume' },
    { label: '📊 Check ATS Score', color: '#00b894', path: '/ats' },
    { label: '🤖 Ask AI Chatbot', color: '#e17055', path: '/chatbot' },
    { label: '📚 View Roadmap', color: '#0984e3', path: '/skills' },
    { label: '💼 Mock Interview', color: '#a29bfe', path: '/interview' },
  ]

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f9ff', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>🎯 PlaceAI</h1>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Resume', path: '/resume' },
            { label: 'ATS', path: '/ats' },
            { label: 'Companies', path: '/companies' },
            { label: 'Skills', path: '/skills' },
          ].map(item => (
            <span key={item.label}
              onClick={() => navigate(item.path)}
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              {item.label}
            </span>
          ))}
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1a1a2e', fontSize: 14, cursor: 'pointer' }}
            onClick={() => navigate('/profile')}>
            S
          </div>
        </div>
      </nav>

      <div style={{ padding: '32px' }}>

        {/* Welcome */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px' }}>
            Welcome back, Student! 👋
          </h2>
          <p style={{ color: '#888', fontSize: 15 }}>Here's your placement readiness overview</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: '24px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', borderLeft: `4px solid ${s.color}` }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>

          {/* Company Match */}
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>🏢 Company Match</h3>
            {companies.map((c, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#444' }}>{c.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{c.match}%</span>
                </div>
                <div style={{ background: '#f0f0f0', borderRadius: 10, height: 8 }}>
                  <div style={{ width: `${c.match}%`, background: c.color, borderRadius: 10, height: 8 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Skill Status */}
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>🎯 Skill Status</h3>
            {skills.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < skills.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <span style={{ fontSize: 14, color: '#444' }}>{s.name}</span>
                <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: s.have ? '#e8faf5' : '#fff0ed', color: s.have ? '#00b894' : '#e17055' }}>
                  {s.have ? '✓ Have it' : '✗ Missing'}
                </span>
              </div>
            ))}
            <button
              onClick={() => navigate('/skills')}
              style={{ marginTop: 16, width: '100%', padding: '10px', background: 'linear-gradient(135deg,#6C63FF,#4facfe)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
              View Full Skill Gap →
            </button>
          </div>

        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>⚡ Quick Actions</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {quickActions.map((btn, i) => (
              <button key={i}
                onClick={() => navigate(btn.path)}
                style={{ padding: '10px 20px', background: btn.color, color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}