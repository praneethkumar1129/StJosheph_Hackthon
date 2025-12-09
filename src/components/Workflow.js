import React from 'react';

const Workflow = () => {
  const steps = [
    {
      icon: '📄',
      title: 'PDF Upload',
      description: 'Upload resume in PDF format via API Gateway to AWS Lambda function.'
    },
    {
      icon: '🔍',
      title: 'AWS Textract',
      description: 'Extract text from PDF using AWS Textract OCR service with high accuracy.'
    },
    {
      icon: '🤖',
      title: 'Bedrock AI',
      description: 'Process extracted text with Amazon Titan LLM to intelligently structure data.'
    },
    {
      icon: '📊',
      title: 'JSON Output',
      description: 'Return structured JSON with 15+ fields ready for HR systems and databases.'
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
          <h3 className="text-center mb-4">AWS Architecture</h3>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '32px',
            border: '1px solid rgba(255, 153, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🌐</div>
                <strong style={{ color: '#06b6d4' }}>React Frontend</strong>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>File Upload</p>
              </div>
              <div style={{ fontSize: '2rem', color: '#FF9900' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🚪</div>
                <strong style={{ color: '#FF9900' }}>API Gateway</strong>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>REST API</p>
              </div>
              <div style={{ fontSize: '2rem', color: '#FF9900' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>λ</div>
                <strong style={{ color: '#FF9900' }}>Lambda</strong>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Python Runtime</p>
              </div>
              <div style={{ fontSize: '2rem', color: '#FF9900' }}>↓</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px', marginTop: '24px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🔍</div>
                <strong style={{ color: '#FF9900' }}>Textract</strong>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Text Extraction</p>
              </div>
              <div style={{ fontSize: '2rem', color: '#06b6d4' }}>+</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🤖</div>
                <strong style={{ color: '#FF9900' }}>Bedrock Titan</strong>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>AI Processing</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
              <div style={{ fontSize: '2rem', color: '#FF9900' }}>↓</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>📊</div>
              <strong style={{ color: '#10b981' }}>Structured JSON</strong>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>15+ Fields Extracted</p>
            </div>
          </div>

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