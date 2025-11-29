import React from 'react';

const OutcomeLimitations = () => {
  const outcomes = [
    'Reduced manual resume processing time by 90%',
    'Consistent structured JSON data format',
    'Multi-format support including scanned images',
    'Useful for placement cells and HR teams',
    'Scalable solution for bulk resume processing',
    'Extendable with additional training data'
  ];

  const limitations = [
    'Accuracy depends on resume formatting and text clarity',
    'Scanned images may require manual correction',
    'Some fields may not be present in every resume',
    'Complex layouts might affect extraction quality',
    'OCR performance varies with image quality'
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-2">
          <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
            <h3 style={{ color: '#10b981', marginBottom: '24px' }}>
              🎯 Expected Outcomes
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {outcomes.map((outcome, index) => (
                <li
                  key={index}
                  style={{
                    padding: '12px 0',
                    borderBottom: index < outcomes.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ 
                    color: '#10b981', 
                    marginRight: '12px',
                    fontSize: '1.2rem'
                  }}>
                    ✓
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '24px' }}>
              ⚠️ Limitations
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {limitations.map((limitation, index) => (
                <li
                  key={index}
                  style={{
                    padding: '12px 0',
                    borderBottom: index < limitations.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ 
                    color: '#f59e0b', 
                    marginRight: '12px',
                    fontSize: '1.2rem'
                  }}>
                    !
                  </span>
                  {limitation}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card mt-8 text-center">
          <h3 className="mb-4">Performance Metrics</h3>
          <div className="grid grid-4">
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#06b6d4', marginBottom: '8px' }}>
                90%
              </div>
              <p style={{ color: '#94a3b8' }}>Time Reduction</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>
                85%
              </div>
              <p style={{ color: '#94a3b8' }}>Accuracy Rate</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>
                3
              </div>
              <p style={{ color: '#94a3b8' }}>File Formats</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#8b5cf6', marginBottom: '8px' }}>
                15+
              </div>
              <p style={{ color: '#94a3b8' }}>Data Fields</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeLimitations;