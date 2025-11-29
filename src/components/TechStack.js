import React from 'react';

const TechStack = () => {
  const technologies = [
    'Python', 'pdfplumber', 'python-docx', 'OpenCV', 
    'Tesseract', 'spaCy', 'Pillow', 'Regex', 'JSON'
  ];

  const algorithms = [
    'OCR: OpenCV preprocessing + Tesseract for scanned images',
    'Text extraction: Direct parsing for PDF and DOCX files',
    'Entity detection: spaCy NER for person names and organizations',
    'Pattern matching: Regex for emails, phone numbers, and percentages',
    'Data normalization: Clean and standardize extracted information',
    'JSON mapping: Structure data with null values for missing fields'
  ];

  return (
    <section id="tech" className="section">
      <div className="container">
        <h2 className="text-center mb-8">Tech Stack & Algorithms</h2>
        
        <div className="grid grid-2">
          <div className="card">
            <h3 className="mb-4">🛠️ Tech Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div style={{ marginTop: '32px' }}>
              <h4 style={{ marginBottom: '16px', color: '#06b6d4' }}>Core Libraries:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <strong>pdfplumber:</strong> PDF text extraction
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <strong>python-docx:</strong> DOCX document processing
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <strong>OpenCV + Tesseract:</strong> OCR for images
                </li>
                <li style={{ padding: '8px 0' }}>
                  <strong>spaCy:</strong> Natural Language Processing
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4">🧠 Algorithms & Methods</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {algorithms.map((algorithm, index) => (
                <li
                  key={index}
                  style={{
                    padding: '16px 0',
                    borderBottom: index < algorithms.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}
                >
                  <span style={{ 
                    color: '#06b6d4', 
                    marginRight: '12px', 
                    fontSize: '1.2rem',
                    marginTop: '2px'
                  }}>
                    •
                  </span>
                  <span style={{ lineHeight: '1.5' }}>{algorithm}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;