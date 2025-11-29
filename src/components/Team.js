import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Yeturi Praneeth Kumar',
      role: 'Team Leader / SPOC',
      department: 'Computer Science Engineering',
      college: 'St. Joseph\'s College of Engineering',
      initials: 'YPK'
    },
    {
      name: 'Palem Narasimha',
      role: 'Team Member',
      department: 'Computer Science Engineering', 
      college: 'St. Joseph\'s College of Engineering',
      initials: 'PN'
    }
  ];

  return (
    <section id="team" className="section">
      <div className="container">
        <h2 className="text-center mb-8">Meet Team DataForge</h2>
        
        <div className="card mb-8">
          <div className="text-center mb-8">
            <h3 style={{ color: '#06b6d4', marginBottom: '16px' }}>Team DataForge</h3>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
              Domain 3 – IT Solutions | National Level Hackathon 360° – 2.0
            </p>
          </div>

          <div className="grid grid-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card"
                style={{
                  textAlign: 'center',
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.3)'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'white'
                }}>
                  {member.initials}
                </div>
                <h4 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>
                  {member.name}
                </h4>
                <p style={{ 
                  color: '#06b6d4', 
                  fontWeight: '500', 
                  marginBottom: '8px' 
                }}>
                  {member.role}
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '4px' }}>
                  {member.department}
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  {member.college}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="card text-center">
          <h3 className="mb-4">Contact Information</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>📧</span>
              <div>
                <p style={{ fontWeight: '500', marginBottom: '4px' }}>Email</p>
                <p style={{ color: '#06b6d4' }}>praneethkumar1129@gmail.com</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>📱</span>
              <div>
                <p style={{ fontWeight: '500', marginBottom: '4px' }}>Mobile</p>
                <p style={{ color: '#06b6d4' }}>+91 7601064054</p>
              </div>
            </div>
          </div>
          <p style={{ marginTop: '24px', color: '#94a3b8', fontSize: '0.9rem' }}>
            SPOC: Yeturi Praneeth Kumar
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;