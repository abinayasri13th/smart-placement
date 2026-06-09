import { useState } from 'react'
import { loginUser } from '../services/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    if (!email || !password) {
      setError('Please enter email and password!')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await loginUser({ email, password })
localStorage.setItem('token', res.data.token)
localStorage.setItem('userName', res.data.name)
localStorage.setItem('userEmail', res.data.email)
window.location.href = '/dashboard'
    
    } catch (err) {
      setError('Invalid email or password!')
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#667eea,#764ba2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Segoe UI,sans-serif'}}>
      <div style={{background:'white', borderRadius:24, padding:'48px 40px', width:'100%', maxWidth:420, boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}>

        <div style={{textAlign:'center', marginBottom:32}}>
          <div style={{fontSize:40}}>🎯</div>
          <h1 style={{fontSize:28, fontWeight:800, color:'#6C63FF', margin:'8px 0 4px'}}>PlaceAI</h1>
          <p style={{color:'#888', fontSize:14}}>Welcome back! Login to continue</p>
        </div>

        {error && (
          <div style={{background:'#fff0ed', color:'#e17055', padding:'10px 16px', borderRadius:8, marginBottom:16, fontSize:13}}>
            ⚠️ {error}
          </div>
        )}

        <div style={{marginBottom:20}}>
          <label style={{fontSize:13, fontWeight:600, color:'#444', display:'block', marginBottom:6}}>Email Address</label>
          <input type="email" placeholder="you@college.edu"
            value={email} onChange={e => setEmail(e.target.value)}
            style={{width:'100%', padding:'12px 16px', border:'2px solid #e8e8ff', borderRadius:10, fontSize:15, outline:'none', boxSizing:'border-box'}}
            onFocus={e=>e.target.style.border='2px solid #6C63FF'}
            onBlur={e=>e.target.style.border='2px solid #e8e8ff'}
          />
        </div>

        <div style={{marginBottom:24}}>
          <label style={{fontSize:13, fontWeight:600, color:'#444', display:'block', marginBottom:6}}>Password</label>
          <input type="password" placeholder="Enter your password"
            value={password} onChange={e => setPassword(e.target.value)}
            style={{width:'100%', padding:'12px 16px', border:'2px solid #e8e8ff', borderRadius:10, fontSize:15, outline:'none', boxSizing:'border-box'}}
            onFocus={e=>e.target.style.border='2px solid #6C63FF'}
            onBlur={e=>e.target.style.border='2px solid #e8e8ff'}
          />
        </div>

        <button onClick={handleLogin} style={{
          width:'100%', padding:'14px',
          background: loading ? '#aaa' : 'linear-gradient(135deg,#6C63FF,#4facfe)',
          color:'white', border:'none', borderRadius:10,
          fontSize:16, fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading ? '⏳ Logging in...' : 'Login →'}
        </button>

        <p style={{textAlign:'center', marginTop:24, color:'#888', fontSize:14}}>
          Don't have an account?{' '}
          <a href="/signup" style={{color:'#6C63FF', fontWeight:700, textDecoration:'none'}}>Sign up free</a>
        </p>
      </div>
    </div>
  )
}