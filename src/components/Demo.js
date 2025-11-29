import React, { useState } from 'react';

const Demo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('pdf');
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
      setError('Please select a file first');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setShowOutput(false);

    try {
      const base64 = await convertToBase64(selectedFile);
      
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
      
      const response = await fetch('https://nrkg7cmta3.execute-api.ap-south-1.amazonaws.com/dev/praneeth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileContentBase64: base64
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 504) {
          throw new Error('Request timed out. Please try with a smaller file or try again.');
        }
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Parse the actual resume data from the body field
      let resumeData;
      if (data.body) {
        resumeData = JSON.parse(data.body);
      } else {
        resumeData = data;
      }
      
      console.log('Parsed Resume Data:', resumeData);
      setExtractedData(resumeData);
      setShowOutput(true);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try with a smaller file.');
      } else {
        setError(`Error processing file: ${err.message}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
                accept=".pdf,.docx,.jpg,.jpeg,.png"
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



            <button 
              className="btn btn-primary"
              onClick={handleExtract}
              disabled={!selectedFile || isProcessing}
              style={{ 
                width: '100%',
                opacity: (!selectedFile || isProcessing) ? 0.6 : 1,
                cursor: (!selectedFile || isProcessing) ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? 'Processing...' : 'Extract Resume Data'}
            </button>

            {error && (
              <p style={{ fontSize: '0.9rem', color: '#ef4444', marginTop: '16px' }}>
                {error}
              </p>
            )}

            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '16px' }}>
              * AI-powered extraction using AWS Textract and Bedrock
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
                background: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '20px',
                maxHeight: '500px',
                overflow: 'auto',
                border: '1px solid rgba(6, 182, 212, 0.3)'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#06b6d4', marginBottom: '10px' }}>Personal Information</h4>
                  <p><strong>Name:</strong> {extractedData.name || 'Not found'}</p>
                  <p><strong>Email:</strong> {extractedData.email || 'Not found'}</p>
                  <p><strong>Phone:</strong> {extractedData.phoneNumber || 'Not found'}</p>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#06b6d4', marginBottom: '10px' }}>High School</h4>
                  <p><strong>School:</strong> {extractedData.highSchoolName || 'Not found'}</p>
                  <p><strong>Address:</strong> {extractedData.highSchoolAddress || 'Not found'}</p>
                  <p><strong>GPA:</strong> {extractedData.highSchoolGpaOrPercentage || 'Not found'}</p>
                  <p><strong>Graduation Year:</strong> {extractedData.highSchoolGraduationYear || 'Not found'}</p>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#06b6d4', marginBottom: '10px' }}>Undergraduate</h4>
                  <p><strong>College:</strong> {extractedData.ugCollegeName || 'Not found'}</p>
                  <p><strong>Degree:</strong> {extractedData.ugDegree || 'Not found'}</p>
                  <p><strong>Major:</strong> {extractedData.ugMajor || 'Not found'}</p>
                  <p><strong>GPA:</strong> {extractedData.ugCollegeGpaOrPercentage || 'Not found'}</p>
                  <p><strong>Graduation Year:</strong> {extractedData.ugGraduationYear || 'Not found'}</p>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#06b6d4', marginBottom: '10px' }}>Postgraduate</h4>
                  <p><strong>College:</strong> {extractedData.pgCollegeName || 'Not found'}</p>
                  <p><strong>Degree:</strong> {extractedData.pgDegree || 'Not found'}</p>
                  <p><strong>Major:</strong> {extractedData.pgMajor || 'Not found'}</p>
                  <p><strong>GPA:</strong> {extractedData.pgCollegeGpaOrPercentage || 'Not found'}</p>
                  <p><strong>Graduation Year:</strong> {extractedData.pgGraduationYear || 'Not found'}</p>
                </div>
                
                {extractedData.certifications && extractedData.certifications.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#06b6d4', marginBottom: '10px' }}>Certifications</h4>
                    {extractedData.certifications.map((cert, index) => (
                      <p key={index}>• {cert}</p>
                    ))}
                  </div>
                )}
                
                {extractedData.achievements && extractedData.achievements.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#06b6d4', marginBottom: '10px' }}>Achievements</h4>
                    {extractedData.achievements.map((achievement, index) => (
                      <p key={index}>• {achievement}</p>
                    ))}
                  </div>
                )}
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