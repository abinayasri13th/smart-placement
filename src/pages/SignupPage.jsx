import { useState } from 'react'
import { registerUser } from '../services/api'

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', college: '', branch: '', year: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSignup() {
    if (!form.name) { setError('Please enter your full name!'); return }
    if (!form.email) { setError('Please enter your email!'); return }
    if (!form.password) { setError('Please enter a password!'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters!'); return }
    if (!form.college) { setError('Please enter your college name!'); return }
    if (!form.branch) { setError('Please select your branch!'); return }
    if (!form.year) { setError('Please select your year!'); return }

    setLoading(true)
    setError('')

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        college: form.college,
        branch: form.branch,
        year: form.year
      }
      console.log('Sending signup:', payload)
      const res = await registerUser(payload)
      console.log('Signup response:', res.data)
      alert('Account created successfully! Please login now.')
      window.location.href = '/login'
    } catch (err) {
      console.log('Signup error:', err.response?.data)
      setError(err.response?.data?.detail || 'Registration failed! Try again.')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '11px 16px',
    border: '2px solid #e8e8ff', borderRadius: 10,
    fontSize: 14, outline: 'none', boxSizing: 'border-box'
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Segoe UI,sans-serif', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: 24, padding: '40px', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36 }}>🎯</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#6C63FF', margin: '8px 0 4px' }}>Join PlaceAI</h1>
          <p style={{ color: '#888', fontSize: 14 }}>Create your free account and get placed!</p>
        </div>

        {error && (
          <div style={{ background: '#fff0ed', color: '#e17055', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 500 }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>Full Name *</label>
          <input name="name" placeholder="Your full name"
            value={form.name} onChange={handleChange} style={inputStyle}
            onFocus={e => e.target.style.border = '2px solid #6C63FF'}
            onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>Email Address *</label>
          <input name="email" type="email" placeholder="you@college.edu"
            value={form.email} onChange={handleChange} style={inputStyle}
            onFocus={e => e.target.style.border = '2px solid #6C63FF'}
            onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>Password * (min 6 characters)</label>
          <input name="password" type="password" placeholder="Min 6 characters"
            value={form.password} onChange={handleChange} style={inputStyle}
            onFocus={e => e.target.style.border = '2px solid #6C63FF'}
            onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>College Name *</label>
          <input name="college" placeholder="Your college name"
            value={form.college} onChange={handleChange} style={inputStyle}
            onFocus={e => e.target.style.border = '2px solid #6C63FF'}
            onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>Branch *</label>
            <select name="branch" value={form.branch} onChange={handleChange}
              style={{ ...inputStyle, background: 'white' }}>
              <option value="">Select Branch</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Civil</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>Year *</label>
            <select name="year" value={form.year} onChange={handleChange}
              style={{ ...inputStyle, background: 'white' }}>
              <option value="">Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>
        </div>

        <button onClick={handleSignup} style={{
          width: '100%', padding: '14px',
          background: loading ? '#aaa' : 'linear-gradient(135deg,#6C63FF,#4facfe)',
          color: 'white', border: 'none', borderRadius: 10,
          fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading ? '⏳ Creating account...' : 'Create Free Account 🚀'}
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#888', fontSize: 14 }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#6C63FF', fontWeight: 700, textDecoration: 'none' }}>Login</a>
        </p>

      </div>
    </div>
  )
}