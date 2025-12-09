import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="container">
        <div className="grid grid-2" style={{ alignItems: 'center', gap: '64px' }}>
          <div>
            <h1>
              Automated <span className="text-cyan">Resume</span> Extractor
            </h1>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '32px', color: '#94a3b8' }}>
              Transform PDF resumes into structured JSON using AWS Textract and Bedrock AI. Serverless, scalable, and intelligent extraction.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('demo')}
              >
                Try the Demo
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('workflow')}
              >
                View Workflow
              </button>
            </div>
            <div style={{ marginTop: '48px', fontSize: '0.9rem', color: '#64748b' }}>
              <p>Built for: <strong>National Level Hackathon 360° – 2.0</strong></p>
              <p>Domain 3 – IT Solutions</p>
            </div>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                width: '80px',
                height: '100px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '8px',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                📄
              </div>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Resume Upload</p>
            </div>
            
            <div style={{ margin: '24px 0', fontSize: '2rem', color: '#06b6d4' }}>
              ↓
            </div>
            
            <div style={{
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '8px',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              textAlign: 'left'
            }}>
              <pre>{`{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "education": [...],
  "experience": [...],
  "skills": [...]
}`}</pre>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '16px' }}>
              Structured JSON Output
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;