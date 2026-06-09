import { useState } from 'react'

export default function Profile() {
  const [form, setForm] = useState({
    name: 'Student Name',
    email: 'student@college.edu',
    college: 'Anna University',
    branch: 'Computer Science',
    year: '3rd Year',
    cgpa: '8.5',
    phone: '+91 9876543210',
    linkedin: 'linkedin.com/in/student',
    github: 'github.com/student',
    skills: 'Python, Java, SQL, React, HTML, CSS',
    internships: '1',
    projects: '3',
  })

  const [saved, setSaved] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle = {
    width: '100%', padding: '11px 16px',
    border: '2px solid #e8e8ff', borderRadius: 10,
    fontSize: 14, outline: 'none', boxSizing: 'border-box',
    background: 'white'
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f9ff', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>🎯 PlaceAI</h1>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: 14 }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>

        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>👤 My Profile</h2>
        <p style={{ color: '#888', marginBottom: 32 }}>Keep your profile updated for better recommendations</p>

        {/* Avatar Card */}
        <div style={{
          background: 'linear-gradient(135deg,#6C63FF,#4facfe)',
          borderRadius: 16, padding: '28px 24px', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 20, color: 'white'
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: '#FFD700', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#1a1a2e'
          }}>
            {form.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{form.name}</div>
            <div style={{ opacity: 0.85, fontSize: 14 }}>{form.college} • {form.branch}</div>
            <div style={{ opacity: 0.85, fontSize: 14 }}>{form.year} • CGPA: {form.cgpa}</div>
          </div>
        </div>

        {/* Personal Info */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>📋 Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Full Name', name: 'name' },
              { label: 'Email', name: 'email' },
              { label: 'Phone', name: 'phone' },
              { label: 'CGPA', name: 'cgpa' },
            ].map(f => (
              <div key={f.name}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: .5 }}>{f.label}</label>
                <input name={f.name} value={form[f.name]} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.border = '2px solid #6C63FF'}
                  onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>🎓 Education</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'College', name: 'college' },
              { label: 'Branch', name: 'branch' },
              { label: 'Year', name: 'year' },
              { label: 'CGPA', name: 'cgpa' },
            ].map(f => (
              <div key={f.name}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: .5 }}>{f.label}</label>
                <input name={f.name} value={form[f.name]} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.border = '2px solid #6C63FF'}
                  onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Experience */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>💻 Skills & Experience</h3>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: .5 }}>Skills (comma separated)</label>
            <textarea name="skills" value={form.skills} onChange={handleChange} rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => e.target.style.border = '2px solid #6C63FF'}
              onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
            />
          </div>

          {/* Skills Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {form.skills.split(',').map((s, i) => s.trim() && (
              <span key={i} style={{ background: '#f0eeff', color: '#6C63FF', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                {s.trim()}
              </span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Internships Count', name: 'internships' },
              { label: 'Projects Count', name: 'projects' },
            ].map(f => (
              <div key={f.name}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: .5 }}>{f.label}</label>
                <input name={f.name} value={form[f.name]} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.border = '2px solid #6C63FF'}
                  onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>🔗 Social Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: '💼 LinkedIn', name: 'linkedin' },
              { label: '🐙 GitHub', name: 'github' },
            ].map(f => (
              <div key={f.name}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input name={f.name} value={form[f.name]} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.border = '2px solid #6C63FF'}
                  onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
                />
              </div>
            ))}
          </div>
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
          {saved ? '✅ Profile Saved Successfully!' : '💾 Save Profile'}
        </button>

      </div>
    </div>
  )
}