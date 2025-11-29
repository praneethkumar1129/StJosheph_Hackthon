import React from 'react';

const Workflow = () => {
  const steps = [
    {
      icon: '📄',
      title: 'File Input',
      description: 'Upload resume in PDF, DOCX, or JPG format. System automatically detects file type.'
    },
    {
      icon: '🔍',
      title: 'Text Extraction',
      description: 'Extract text using pdfplumber, python-docx, or OCR with OpenCV + Tesseract.'
    },
    {
      icon: '🧠',
      title: 'NLP Processing',
      description: 'Clean text and extract entities using spaCy NER and pattern matching.'
    },
    {
      icon: '📊',
      title: 'JSON Output',
      description: 'Generate structured JSON with all extracted information ready for HR systems.'
    }
  ];

  return (
    <section id="workflow" className="section">
      <div className="container">
        <h2 className="text-center mb-8">How It Works</h2>
        
        <div className="grid grid-4">
          {steps.map((step, index) => (
            <div key={index} className="card text-center">
              <div style={{
                fontSize: '3rem',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                {step.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>
                {index + 1}. {step.title}
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="card mt-8">
          <h3 className="text-center mb-4">Sample JSON Schema</h3>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '8px',
            padding: '20px',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            border: '1px solid rgba(6, 182, 212, 0.3)'
          }}>
            <pre>{`{
  "name": "string",
  "email": "string",
  "phoneNumber": "string",
  "address": "string",
  "highSchoolName": "string",
  "highSchoolGraduationYear": "string",
  "ugCollegeName": "string",
  "ugDegree": "string",
  "ugCollegeGpaOrPercentage": "string",
  "ugGraduationYear": "string",
  "certifications": ["array of strings"],
  "workExperience": [
    {
      "company": "string",
      "position": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "skills": ["array of strings"],
  "achievements": ["array of strings"]
}`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;