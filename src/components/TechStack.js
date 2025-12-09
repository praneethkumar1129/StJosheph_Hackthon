import React from 'react';

const TechStack = () => {
  const awsServices = [
    'AWS Lambda', 'AWS Textract', 'Amazon Bedrock', 'API Gateway',
    'Amazon Titan LLM', 'IAM Roles', 'CloudWatch'
  ];

  const technologies = [
    'Python 3.x', 'Boto3 SDK', 'Base64 Encoding', 'JSON Processing'
  ];

  const workflow = [
    'API Gateway receives PDF file as Base64-encoded string via POST request',
    'Lambda function validates PDF format and decodes Base64 content',
    'AWS Textract extracts text from PDF with LINE-level block detection',
    'Extracted text is limited to 3000 characters for optimal processing',
    'Amazon Bedrock (Titan Express) structures data using AI with predefined template',
    'JSON response with 15+ fields including education, experience, and certifications'
  ];

  return (
    <section id="tech" className="section">
      <div className="container">
        <h2 className="text-center mb-8">Tech Stack & Algorithms</h2>
        
        <div className="grid grid-2">
          <div className="card">
            <h3 className="mb-4">☁️ AWS Services</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {awsServices.map((service, index) => (
                <span
                  key={index}
                  style={{
                    background: 'linear-gradient(135deg, #FF9900 0%, #FF6600 100%)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
            
            <div style={{ marginTop: '32px' }}>
              <h4 style={{ marginBottom: '16px', color: '#FF9900' }}>Core AWS Components:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <strong>AWS Textract:</strong> OCR text extraction from PDFs
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <strong>Amazon Bedrock:</strong> AI-powered data structuring
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <strong>AWS Lambda:</strong> Serverless compute execution
                </li>
                <li style={{ padding: '8px 0' }}>
                  <strong>API Gateway:</strong> RESTful API endpoint
                </li>
              </ul>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h4 style={{ marginBottom: '16px', color: '#06b6d4' }}>Technologies:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(6, 182, 212, 0.2)',
                      border: '1px solid rgba(6, 182, 212, 0.5)',
                      color: '#06b6d4',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '0.85rem'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4">⚙️ System Workflow</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {workflow.map((step, index) => (
                <li
                  key={index}
                  style={{
                    padding: '16px 0',
                    borderBottom: index < workflow.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}
                >
                  <span style={{ 
                    color: '#06b6d4', 
                    marginRight: '12px', 
                    fontSize: '1.2rem',
                    marginTop: '2px',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}.
                  </span>
                  <span style={{ lineHeight: '1.5' }}>{step}</span>
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