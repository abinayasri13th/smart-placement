export default function LandingPage() {
  const features = [
    { icon: "📄", title: "ATS Score Analysis", desc: "Know exactly how your resume scores against real job descriptions" },
    { icon: "🎯", title: "Skill Gap Analysis", desc: "Find what skills you need for Google, TCS, Amazon and more" },
    { icon: "📊", title: "Placement Prediction", desc: "AI predicts your placement probability with high accuracy" },
    { icon: "💰", title: "Salary Prediction", desc: "Know your expected salary before the interview" },
    { icon: "🏢", title: "Company Match", desc: "Get matched to companies that fit your profile" },
    { icon: "🤖", title: "AI Career Chatbot", desc: "24/7 personal AI mentor for all your career questions" },
  ]

  return (
    <div style={{fontFamily:'Segoe UI,sans-serif',margin:0,padding:0}}>

      {/* Navbar */}
      <nav style={{background:'linear-gradient(135deg,#6C63FF,#4facfe)',padding:'16px 40px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{color:'white',fontSize:28,fontWeight:800,margin:0}}>🎯 PlaceAI</h1>
        <div style={{display:'flex',gap:16}}>
          <a href="/login" style={{color:'white',textDecoration:'none',padding:'8px 20px',borderRadius:8,border:'2px solid white',fontWeight:600}}>Login</a>
          <a href="/signup" style={{background:'white',color:'#6C63FF',textDecoration:'none',padding:'8px 20px',borderRadius:8,fontWeight:700}}>Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#667eea,#764ba2)',padding:'80px 40px',textAlign:'center',color:'white'}}>
        <h2 style={{fontSize:52,fontWeight:800,margin:'0 0 20px',lineHeight:1.2}}>
          Get Placed at Your<br/>
          <span style={{color:'#FFD700'}}>Dream Company</span>
        </h2>
        <p style={{fontSize:20,opacity:0.9,marginBottom:40,maxWidth:600,margin:'0 auto 40px'}}>
          Upload your resume and get instant AI analysis, skill gap detection, and placement predictions
        </p>
        <div style={{display:'flex',gap:16,justifyContent:'center'}}>
          <a href="/signup" style={{background:'#FFD700',color:'#1a1a2e',padding:'16px 36px',borderRadius:12,textDecoration:'none',fontWeight:800,fontSize:18}}>
            Start for Free →
          </a>
          <a href="/login" style={{background:'rgba(255,255,255,0.2)',color:'white',padding:'16px 36px',borderRadius:12,textDecoration:'none',fontWeight:700,fontSize:18,border:'2px solid rgba(255,255,255,0.5)'}}>
            Login
          </a>
        </div>

        {/* Stats */}
        <div style={{display:'flex',gap:40,justifyContent:'center',marginTop:60,flexWrap:'wrap'}}>
          {[['500+','Students Placed'],['95%','Accuracy Rate'],['6','Top Companies'],['Free','To Use']].map(([num,label])=>(
            <div key={label} style={{textAlign:'center'}}>
              <div style={{fontSize:36,fontWeight:800,color:'#FFD700'}}>{num}</div>
              <div style={{fontSize:14,opacity:0.8}}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Companies */}
      <div style={{background:'#f8f9ff',padding:'40px',textAlign:'center'}}>
        <p style={{color:'#666',fontSize:14,marginBottom:20,fontWeight:600,textTransform:'uppercase',letterSpacing:2}}>Targeting placements at</p>
        <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          {['Google','Microsoft','Amazon','Zoho','TCS','Infosys'].map(c=>(
            <div key={c} style={{background:'white',padding:'10px 24px',borderRadius:8,fontWeight:700,color:'#6C63FF',boxShadow:'0 2px 12px rgba(108,99,255,0.1)',fontSize:15}}>{c}</div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{padding:'60px 40px',background:'white'}}>
        <h3 style={{textAlign:'center',fontSize:36,fontWeight:800,color:'#1a1a2e',marginBottom:8}}>Everything You Need to Get Placed</h3>
        <p style={{textAlign:'center',color:'#666',marginBottom:48,fontSize:18}}>10 powerful AI features in one platform</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24,maxWidth:1000,margin:'0 auto'}}>
          {features.map((f,i)=>(
            <div key={i}
              style={{background:'linear-gradient(135deg,#f8f9ff,#ffffff)',border:'1px solid #e8e8ff',borderRadius:16,padding:'28px 24px',boxShadow:'0 4px 20px rgba(108,99,255,0.08)',cursor:'pointer',transition:'transform 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
            >
              <div style={{fontSize:40,marginBottom:12}}>{f.icon}</div>
              <h4 style={{fontSize:18,fontWeight:700,color:'#1a1a2e',marginBottom:8}}>{f.title}</h4>
              <p style={{color:'#666',fontSize:14,lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{background:'linear-gradient(135deg,#6C63FF,#4facfe)',padding:'60px 40px',textAlign:'center',color:'white'}}>
        <h3 style={{fontSize:36,fontWeight:800,marginBottom:16}}>Ready to Get Placed? 🚀</h3>
        <p style={{fontSize:18,opacity:0.9,marginBottom:32}}>Join hundreds of students already using PlaceAI</p>
        <a href="/signup" style={{background:'#FFD700',color:'#1a1a2e',padding:'16px 48px',borderRadius:12,textDecoration:'none',fontWeight:800,fontSize:20}}>
          Start for Free →
        </a>
      </div>

      {/* Footer */}
      <footer style={{background:'#1a1a2e',color:'#888',textAlign:'center',padding:'24px',fontSize:14}}>
        © 2024 PlaceAI — Built for students, by students ❤️
      </footer>

    </div>
  )
}