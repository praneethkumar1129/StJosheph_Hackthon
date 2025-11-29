import React from 'react';

const ProblemObjective = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-2">
          <div className="card">
            <h3 style={{ color: '#ef4444', marginBottom: '24px' }}>
              🚫 Problem
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Manual resume parsing is slow and repetitive',
                'Multiple formats: PDF, DOCX, scanned images',
                'Inconsistent layouts and formatting',
                'Human errors in data extraction',
                'Time-consuming for HR teams'
              ].map((item, index) => (
                <li key={index} style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#ef4444', marginRight: '12px' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="card">
            <h3 style={{ color: '#10b981', marginBottom: '24px' }}>
              ✅ Objective
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Multi-format support (PDF, DOCX, JPG)',
                'Automated text extraction and cleaning',
                'Structured JSON output for HR systems',
                'NLP-powered information extraction',
                'Consistent data format across all inputs'
              ].map((item, index) => (
                <li key={index} style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#10b981', marginRight: '12px' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemObjective;