import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      background: 'rgba(0, 0, 0, 0.3)', 
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '60px 0 40px'
    }}>
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4">Thank You</h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#94a3b8', 
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Thank you for reviewing our project. We are open to questions and feedback 
            about the Automated Resume Extractor system.
          </p>
          
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#06b6d4', marginBottom: '16px' }}>
              Automated Resume Extractor
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>
              by Team DataForge
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '24px', 
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            <button 
              type="button"
              style={{ 
                color: '#94a3b8', 
                textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                background: 'transparent',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#06b6d4';
                e.target.style.borderColor = '#06b6d4';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#94a3b8';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              📚 Documentation (Coming Soon)
            </button>
            <button 
              type="button"
              style={{ 
                color: '#94a3b8', 
                textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                background: 'transparent',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#06b6d4';
                e.target.style.borderColor = '#06b6d4';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#94a3b8';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              🔗 GitHub Repo (Coming Soon)
            </button>
          </div>

          <div style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            paddingTop: '24px',
            color: '#64748b',
            fontSize: '0.9rem'
          }}>
            <p>St. Joseph's College of Engineering</p>
            <p>National Level Hackathon 360° – 2.0</p>
            <p style={{ marginTop: '8px' }}>
              © 2024 Team DataForge. Built with ❤️ for innovation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;