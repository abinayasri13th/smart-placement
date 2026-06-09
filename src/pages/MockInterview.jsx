import { useState } from 'react'

export default function MockInterview() {
  const [company, setCompany] = useState('google')
  const [role, setRole] = useState('Software Developer')
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const companies = ['google', 'amazon', 'microsoft', 'zoho', 'tcs', 'infosys']

  const questions = {
    google: [
      "Tell me about yourself and why you want to join Google?",
      "Explain the time complexity of binary search and when would you use it?",
      "How would you design a URL shortener like bit.ly?",
      "What is the difference between a stack and a queue? Give real-world examples.",
      "Describe a challenging project you built and what you learned from it.",
    ],
    amazon: [
      "Tell me about a time you showed leadership (Amazon Leadership Principles)?",
      "How would you design Amazon's recommendation system?",
      "What is the difference between SQL and NoSQL databases?",
      "Explain how you would handle a situation where your code caused a production bug.",
      "Why do you want to work at Amazon specifically?",
    ],
    microsoft: [
      "Tell me about yourself and your experience with Microsoft technologies?",
      "How would you design Microsoft Teams?",
      "What is object-oriented programming? Explain with examples.",
      "Describe a time you had to learn a new technology quickly.",
      "Why Microsoft over Google or Amazon?",
    ],
    zoho: [
      "Tell me about yourself and your programming experience?",
      "Write a program to reverse a string without using built-in functions.",
      "What is the difference between abstract class and interface in Java?",
      "How does a HashMap work internally?",
      "Describe a project you built from scratch.",
    ],
    tcs: [
      "Tell me about yourself?",
      "What are your strengths and weaknesses?",
      "Explain OOPS concepts with real-life examples.",
      "What is normalization in databases?",
      "Where do you see yourself in 5 years?",
    ],
    infosys: [
      "Tell me about yourself?",
      "What is the difference between process and thread?",
      "Explain agile methodology.",
      "What are your technical skills and which is your strongest?",
      "Why do you want to join Infosys?",
    ]
  }

  const currentQuestions = questions[company] || questions.tcs

  function handleNext() {
    setAnswers(prev => [...prev, { question: currentQuestions[currentQ], answer }])
    setAnswer('')
    if (currentQ + 1 >= currentQuestions.length) {
      setFinished(true)
    } else {
      setCurrentQ(prev => prev + 1)
    }
  }

  function handleRestart() {
    setStarted(false)
    setFinished(false)
    setCurrentQ(0)
    setAnswers([])
    setAnswer('')
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f8f9ff', minHeight: '100vh' }}>

      <nav style={{ background: 'linear-gradient(135deg,#6C63FF,#4facfe)', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>🎯 PlaceAI</h1>
        <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: 14 }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>💼 Mock Interview</h2>
        <p style={{ color: '#888', marginBottom: 28 }}>Practice real interview questions for your target company!</p>

        {/* Setup */}
        {!started && !finished && (
          <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 10 }}>Select Company</label>
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

            <div style={{ background: '#f8f9ff', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>📋 Interview Details</div>
              <div style={{ fontSize: 14, color: '#444' }}>Company: <b>{company.charAt(0).toUpperCase() + company.slice(1)}</b></div>
              <div style={{ fontSize: 14, color: '#444' }}>Questions: <b>{currentQuestions.length}</b></div>
              <div style={{ fontSize: 14, color: '#444' }}>Type: <b>Technical + HR</b></div>
            </div>

            <button onClick={() => setStarted(true)} style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg,#6C63FF,#4facfe)',
              color: 'white', border: 'none', borderRadius: 12,
              fontSize: 16, fontWeight: 700, cursor: 'pointer'
            }}>
              🚀 Start Mock Interview
            </button>
          </div>
        )}

        {/* Interview in progress */}
        {started && !finished && (
          <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>

            {/* Progress */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#888' }}>Question {currentQ + 1} of {currentQuestions.length}</span>
                <span style={{ fontSize: 13, color: '#6C63FF', fontWeight: 600 }}>{company.charAt(0).toUpperCase() + company.slice(1)} Interview</span>
              </div>
              <div style={{ background: '#f0f0f0', borderRadius: 10, height: 8 }}>
                <div style={{ width: `${((currentQ + 1) / currentQuestions.length) * 100}%`, background: 'linear-gradient(135deg,#6C63FF,#4facfe)', borderRadius: 10, height: 8, transition: 'width 0.3s' }} />
              </div>
            </div>

            {/* Question */}
            <div style={{ background: 'linear-gradient(135deg,#f0eeff,#e8f4ff)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#6C63FF', fontWeight: 600, marginBottom: 8 }}>QUESTION {currentQ + 1}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.6 }}>
                {currentQuestions[currentQ]}
              </div>
            </div>

            {/* Answer */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 8 }}>Your Answer</label>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Type your answer here... Take your time and think carefully!"
                rows={6}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #e8e8ff', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => e.target.style.border = '2px solid #6C63FF'}
                onBlur={e => e.target.style.border = '2px solid #e8e8ff'}
              />
            </div>

            <button onClick={handleNext} style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg,#6C63FF,#4facfe)',
              color: 'white', border: 'none', borderRadius: 12,
              fontSize: 16, fontWeight: 700, cursor: 'pointer'
            }}>
              {currentQ + 1 === currentQuestions.length ? '✅ Finish Interview' : 'Next Question →'}
            </button>
          </div>
        )}

        {/* Finished */}
        {finished && (
          <div>
            <div style={{ background: 'linear-gradient(135deg,#00b894,#00cec9)', borderRadius: 16, padding: 32, textAlign: 'center', color: 'white', marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
              <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Interview Complete!</h3>
              <p style={{ opacity: 0.9 }}>You answered all {currentQuestions.length} questions for {company.charAt(0).toUpperCase() + company.slice(1)}</p>
            </div>

            {/* Review Answers */}
            <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>📋 Your Answers Review</h3>
              {answers.map((a, i) => (
                <div key={i} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < answers.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#6C63FF', marginBottom: 6 }}>Q{i + 1}: {a.question}</div>
                  <div style={{ fontSize: 13, color: '#666', background: '#f8f9ff', padding: '10px 14px', borderRadius: 8 }}>
                    {a.answer || <span style={{ color: '#aaa', fontStyle: 'italic' }}>No answer provided</span>}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleRestart} style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg,#6C63FF,#4facfe)',
              color: 'white', border: 'none', borderRadius: 12,
              fontSize: 16, fontWeight: 700, cursor: 'pointer'
            }}>
              🔄 Practice Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}