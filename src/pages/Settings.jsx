import { useState } from 'react'

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true, placement: true, tips: false, weekly: true
  })
  const [targetRole, setTargetRole] = useState('Software Developer')
  const [targetCompanies, setTargetCompanies] = useState(['Zoho', 'TCS'])
  const [saved, setSaved] = useState(false)

  function toggleNotif(key) {
    setNotifications({ ...notifications, [key]: !notifications[key] })
    setSaved(false)
  }

  function toggleCompany(c) {
    setTargetCompanies(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    )
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const Toggle = ({ on, onClick }) => (
    <div onClick={onClick} style={{
      width: 48, height: 26, borderRadius: 13, cursor: 'pointer',
      background: on ? '#6C63FF' : '#ddd', position: 'relative',
      transition: 'background 0.2s'
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', background: 'white',
        position: 'absolute', top: 3,
        left: on ? 25 : 3, transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
      }} />
    </div>
  )

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f9ff', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>🎯 PlaceAI</h1>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: 14 }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 20px' }}>

        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>⚙️ Settings</h2>
        <p style={{ color: '#888', marginBottom: 32 }}>Customize your PlaceAI experience</p>

        {/* Notifications */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>🔔 Notifications</h3>
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Get updates via email' },
            { key: 'placement', label: 'Placement Alerts', desc: 'New job openings matching your profile' },
            { key: 'tips', label: 'Career Tips', desc: 'Weekly career improvement tips' },
            { key: 'weekly', label: 'Weekly Report', desc: 'Your weekly progress summary' },
          ].map(n => (
            <div key={n.key} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 0', borderBottom: '1px solid #f0f0f0'
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{n.label}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{n.desc}</div>
              </div>
              <Toggle on={notifications[n.key]} onClick={() => toggleNotif(n.key)} />
            </div>
          ))}
        </div>

        {/* Target Role */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>🎯 Target Role</h3>
          <select
            value={targetRole}
            onChange={e => { setTargetRole(e.target.value); setSaved(false) }}
            style={{
              width: '100%', padding: '12px 16px',
              border: '2px solid #e8e8ff', borderRadius: 10,
              fontSize: 14, outline: 'none', background: 'white'
            }}
          >
            {['Software Developer', 'Data Scientist', 'Frontend Developer',
              'Backend Developer', 'Full Stack Developer', 'DevOps Engineer',
              'Machine Learning Engineer', 'System Analyst'].map(r => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Target Companies */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>🏢 Target Companies</h3>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>Select companies you want to get placed in</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Google', 'Microsoft', 'Amazon', 'Zoho', 'TCS', 'Infosys'].map(c => (
              <button key={c} onClick={() => toggleCompany(c)} style={{
                padding: '10px 22px', borderRadius: 20, border: 'none',
                fontWeight: 600, cursor: 'pointer', fontSize: 14,
                background: targetCompanies.includes(c) ? '#6C63FF' : '#f0f0f0',
                color: targetCompanies.includes(c) ? 'white' : '#666',
                transition: 'all 0.2s'
              }}>{c}</button>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: '#888' }}>
            Selected: {targetCompanies.join(', ') || 'None'}
          </div>
        </div>

        {/* Account */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>🔐 Account</h3>
          {[
            { label: 'Change Password', icon: '🔑', color: '#6C63FF' },
            { label: 'Download My Data', icon: '📥', color: '#0984e3' },
            { label: 'Delete Account', icon: '🗑️', color: '#e17055' },
          ].map((btn, i) => (
            <button key={i} style={{
              width: '100%', padding: '12px 16px', marginBottom: 10,
              background: btn.color + '11', color: btn.color,
              border: `1px solid ${btn.color}33`, borderRadius: 10,
              fontWeight: 600, cursor: 'pointer', fontSize: 14,
              textAlign: 'left'
            }}>
              {btn.icon} {btn.label}
            </button>
          ))}
        </div>

        {/* Save Button */}
        <button onClick={handleSave} style={{
          width: '100%', padding: '16px',
          background: saved ? '#00b894' : 'linear-gradient(135deg,#6C63FF,#4facfe)',
          color: 'white', border: 'none', borderRadius: 12,
          fontSize: 16, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(108,99,255,0.3)',
          transition: 'all 0.3s'
        }}>
          {saved ? '✅ Settings Saved!' : '💾 Save Settings'}
        </button>

      </div>
    </div>
  )
}