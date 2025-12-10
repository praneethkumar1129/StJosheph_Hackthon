import React, { useState } from 'react';

const Demo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleExtract = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setShowOutput(false);

    try {
      const base64 = await convertToBase64(selectedFile);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      
      const response = await fetch('https://nrkg7cmta3.execute-api.ap-south-1.amazonaws.com/dev/praneeth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileContentBase64: base64 }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(response.status === 504 ? 'Request timed out' : `API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API Response:', data);
      
      let resumeData;
      if (data.body) {
        const parsedBody = JSON.parse(data.body);
        console.log('Parsed Body:', parsedBody);
        
        // Handle rows array format from API
        if (parsedBody.rows && Array.isArray(parsedBody.rows) && parsedBody.rows.length > 0) {
          resumeData = parsedBody.rows[0];
          console.log('Extracted from rows:', resumeData);
        } else {
          resumeData = parsedBody;
        }
      } else {
        resumeData = data;
      }
      
      console.log('Final Resume Data:', resumeData);
      setExtractedData(resumeData);
      setShowOutput(true);
    } catch (err) {
      setError(err.name === 'AbortError' ? 'Request timed out' : `Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setError('Only PDF files are supported');
      return;
    }
    setSelectedFile(file);
    setShowOutput(false);
    setError(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setExtractedData(null);
    setShowOutput(false);
    setError(null);
    document.getElementById('file-upload').value = '';
  };

  const InfoCard = ({ icon, title, children }) => (
    <div style={{
      background: 'rgba(6, 182, 212, 0.1)',
      border: '1px solid rgba(6, 182, 212, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px'
    }}>
      <h4 style={{ color: '#06b6d4', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{icon}</span> {title}
      </h4>
      {children}
    </div>
  );

  const DataRow = ({ label, value }) => value ? (
    <p style={{ marginBottom: '8px', lineHeight: '1.6' }}>
      <strong style={{ color: '#94a3b8' }}>{label}:</strong> <span style={{ color: '#f8fafc' }}>{value}</span>
    </p>
  ) : null;

  return (
    <section id="demo" className="section">
      <div className="container">
        <h2 className="text-center mb-8">Interactive Demo</h2>
        
        <div className="grid grid-2" style={{ alignItems: 'start' }}>
          <div className="card">
            <h3 className="mb-4">Upload Resume</h3>
            
            <div style={{
              border: '2px dashed rgba(6, 182, 212, 0.5)',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              marginBottom: '24px',
              background: 'rgba(6, 182, 212, 0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📁</div>
              <p style={{ marginBottom: '16px', color: '#94a3b8' }}>
                Drag & drop your resume or click to browse
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="btn btn-secondary">
                Browse File
              </label>
              {selectedFile && (
                <p style={{ marginTop: '16px', color: '#06b6d4' }}>
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-primary"
                onClick={handleExtract}
                disabled={!selectedFile || isProcessing}
                style={{ 
                  flex: 1,
                  opacity: (!selectedFile || isProcessing) ? 0.6 : 1,
                  cursor: (!selectedFile || isProcessing) ? 'not-allowed' : 'pointer'
                }}
              >
                {isProcessing ? 'Processing...' : 'Extract Resume Data'}
              </button>
              
              {(selectedFile || showOutput) && (
                <button 
                  className="btn btn-secondary"
                  onClick={handleClear}
                  disabled={isProcessing}
                >
                  Clear
                </button>
              )}
            </div>

            {error && (
              <p style={{ fontSize: '0.9rem', color: '#ef4444', marginTop: '16px' }}>
                {error}
              </p>
            )}

            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '16px', lineHeight: '1.5' }}>
              ⚡ AI-powered extraction using AWS Textract & Bedrock<br/>
              📄 PDF files only (convert DOC/DOCX to PDF first)
            </p>
          </div>

          <div className="card">
            <h3 className="mb-4">Extracted Data</h3>
            {isProcessing ? (
              <div style={{
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '60px 20px',
                textAlign: 'center',
                color: '#64748b',
                border: '1px dashed rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🔄</div>
                <p>Processing your resume...</p>
                <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>This may take up to 60 seconds for large files...</p>
              </div>
            ) : showOutput && extractedData ? (
              <div style={{
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '12px',
                padding: '24px',
                maxHeight: '600px',
                overflow: 'auto'
              }}>
                <InfoCard icon="👤" title="Personal Information">
                  <DataRow label="Name" value={extractedData.name} />
                  <DataRow label="Email" value={extractedData.email} />
                  <DataRow label="Phone" value={extractedData.phoneNumber} />
                  {!extractedData.name && !extractedData.email && !extractedData.phoneNumber && (
                    <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No personal information found</p>
                  )}
                </InfoCard>

                {extractedData.highSchoolName && (
                  <InfoCard icon="🏫" title="High School">
                    <DataRow label="School" value={extractedData.highSchoolName} />
                    <DataRow label="Address" value={extractedData.highSchoolAddress} />
                    <DataRow label="Board" value={extractedData.highSchoolBoard} />
                    <DataRow label="GPA" value={extractedData.highSchoolGpaOrPercentage} />
                    <DataRow label="Graduation Year" value={extractedData.highSchoolGraduationYear} />
                  </InfoCard>
                )}

                {extractedData.ugCollegeName && (
                  <InfoCard icon="🎓" title="Undergraduate Education">
                    <DataRow label="College" value={extractedData.ugCollegeName} />
                    <DataRow label="Address" value={extractedData.ugCollegeAddress} />
                    <DataRow label="Degree" value={extractedData.ugDegree} />
                    <DataRow label="Major" value={extractedData.ugMajor} />
                    <DataRow label="University" value={extractedData.ugUniversity} />
                    <DataRow label="GPA" value={extractedData.ugCollegeGpaOrPercentage} />
                    <DataRow label="Graduation Year" value={extractedData.ugGraduationYear} />
                  </InfoCard>
                )}

                {extractedData.pgCollegeName && (
                  <InfoCard icon="🎯" title="Postgraduate Education">
                    <DataRow label="College" value={extractedData.pgCollegeName} />
                    <DataRow label="Address" value={extractedData.pgCollegeAddress} />
                    <DataRow label="Degree" value={extractedData.pgDegree} />
                    <DataRow label="Major" value={extractedData.pgMajor} />
                    <DataRow label="University" value={extractedData.pgUniversity} />
                    <DataRow label="GPA" value={extractedData.pgCollegeGpaOrPercentage} />
                    <DataRow label="Graduation Year" value={extractedData.pgGraduationYear} />
                  </InfoCard>
                )}

                {extractedData.workExperience?.length > 0 && (
                  <InfoCard icon="💼" title="Work Experience">
                    {extractedData.workExperience.map((exp, i) => (
                      <div key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: i < extractedData.workExperience.length - 1 ? '1px solid rgba(148, 163, 184, 0.2)' : 'none' }}>
                        <DataRow label="Company" value={exp.company} />
                        <DataRow label="Position" value={exp.position} />
                        <DataRow label="Duration" value={`${exp.startDate || ''} - ${exp.endDate || 'Present'}`} />
                      </div>
                    ))}
                  </InfoCard>
                )}

                {extractedData.certifications?.length > 0 && (
                  <InfoCard icon="📜" title="Certifications">
                    {extractedData.certifications.map((cert, i) => (
                      <div key={i} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: '3px solid rgba(6, 182, 212, 0.5)' }}>
                        <p style={{ color: '#f8fafc', marginBottom: '4px' }}>{typeof cert === 'string' ? cert : cert.name}</p>
                        {cert.date && <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>📅 {cert.date}</p>}
                      </div>
                    ))}
                  </InfoCard>
                )}

                {extractedData.achievements?.length > 0 && (
                  <InfoCard icon="🏆" title="Achievements">
                    {extractedData.achievements.map((ach, i) => (
                      <div key={i} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: '3px solid rgba(6, 182, 212, 0.5)' }}>
                        <p style={{ color: '#f8fafc', marginBottom: '4px' }}>{typeof ach === 'string' ? ach : ach.name}</p>
                        {ach.date && <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>📅 {ach.date}</p>}
                      </div>
                    ))}
                  </InfoCard>
                )}

                {(extractedData.testScores?.sat || extractedData.testScores?.gre || extractedData.testScores?.toefl || extractedData.testScores?.ielts) && (
                  <InfoCard icon="📊" title="Test Scores">
                    <DataRow label="SAT" value={extractedData.testScores.sat} />
                    <DataRow label="ACT" value={extractedData.testScores.act} />
                    <DataRow label="GRE" value={extractedData.testScores.gre} />
                    <DataRow label="GMAT" value={extractedData.testScores.gmat} />
                    <DataRow label="TOEFL" value={extractedData.testScores.toefl} />
                    <DataRow label="IELTS" value={extractedData.testScores.ielts} />
                  </InfoCard>
                )}
                
                {/* Debug Section - Remove in production */}
                <InfoCard icon="🔍" title="Debug - Raw Data">
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '8px',
                    padding: '12px',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    maxHeight: '200px',
                    overflow: 'auto'
                  }}>
                    <pre>{JSON.stringify(extractedData, null, 2)}</pre>
                  </div>
                </InfoCard>
              </div>
            ) : (
              <div style={{
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '60px 20px',
                textAlign: 'center',
                color: '#64748b',
                border: '1px dashed rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⚡</div>
                <p>Upload a resume and click "Extract Resume Data" to see the structured output</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;