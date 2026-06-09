import { useState } from 'react'
import axios from 'axios'

export default function ResumeUpload() {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.type === 'application/pdf') {
      setFile(dropped)
      setError('')
    } else {
      setError('Please upload a PDF file only!')
    }
  }

  function handleFileSelect(e) {
    const selected = e.target.files[0]
    if (selected) { setFile(selected); setError('') }
  }

  async function handleUpload() {
    if (!file) return setError('Please select a file first!')
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post(
        'http://localhost:8000/api/v1/resume/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      setResult(res.data)
      localStorage.setItem('resumeText', res.data.raw_text || '')
      localStorage.setItem('resumeSkills', JSON.stringify(res.data.skills || []))
    } catch (err) {
      setError('Upload failed! Make sure backend is running.')
    }
    setUploading(false)
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f9ff', minHeight: '100vh' }}>

      <nav style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>🎯 PlaceAI</h1>
        <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: 14 }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>📄 Upload Your Resume</h2>
        <p style={{ color: '#888', marginBottom: 32 }}>Upload your PDF resume to get AI analysis</p>

        {error && (
          <div style={{ background: '#fff0ed', color: '#e17055', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
            ⚠️ {error}
          </div>
        )}

        {!result ? (
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
            style={{
              border: `3px dashed ${dragOver ? '#6C63FF' : '#c5c5ff'}`,
              borderRadius: 20, padding: '60px 40px',
              textAlign: 'center', background: dragOver ? '#f0eeff' : 'white',
              cursor: 'pointer', marginBottom: 24
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>📂</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>
              {dragOver ? 'Drop it here!' : 'Drag & Drop your Resume'}
            </h3>
            <p style={{ color: '#888', marginBottom: 8 }}>or click to browse files</p>
            <p style={{ color: '#aaa', fontSize: 13 }}>PDF only • Max 5MB</p>
            <input id="fileInput" type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFileSelect} />
          </div>
        ) : (
          <div style={{ background: 'linear-gradient(135deg,#00b894,#00cec9)', borderRadius: 20, padding: 32, color: 'white', marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Resume Parsed Successfully!</h3>
            <p style={{ opacity: 0.9 }}>Name: {result.name || 'Not detected'}</p>
            <p style={{ opacity: 0.9 }}>Skills found: {result.skills_count}</p>
            <p style={{ opacity: 0.9, fontSize: 13 }}>Skills: {result.skills?.join(', ') || 'None detected'}</p>
          </div>
        )}

        {file && !result && (
          <div style={{ background: 'white', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32 }}>📄</span>
              <div>
                <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 14 }}>{file.name}</div>
                <div style={{ color: '#888', fontSize: 12 }}>{(file.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
            <button onClick={() => setFile(null)} style={{ background: '#fff0ed', color: '#e17055', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 600 }}>
              Remove
            </button>
          </div>
        )}

        {!result && (
          <button onClick={handleUpload} style={{
            width: '100%', padding: '16px',
            background: uploading ? '#aaa' : 'linear-gradient(135deg,#6C63FF,#4facfe)',
            color: 'white', border: 'none', borderRadius: 12,
            fontSize: 16, fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer'
          }}>
            {uploading ? '⏳ Uploading & Analyzing...' : '🚀 Upload & Analyze Resume'}
          </button>
        )}

        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button onClick={() => window.location.href = '/ats'}
              style={{ padding: '14px', background: '#6C63FF', color: 'white', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
              📊 Check ATS Score
            </button>
            <button onClick={() => window.location.href = '/skills'}
              style={{ padding: '14px', background: '#00b894', color: 'white', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
              🎯 Skill Gap Analysis
            </button>
            <button onClick={() => window.location.href = '/companies'}
              style={{ padding: '14px', background: '#0984e3', color: 'white', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
              🏢 Company Matches
            </button>
            <button onClick={() => window.location.href = '/dashboard'}
              style={{ padding: '14px', background: '#e17055', color: 'white', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
              💰 Salary Prediction
            </button>
          </div>
        )}
      </div>
    </div>
  )
}