import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      background: isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      transition: 'all 0.3s ease',
      padding: '16px 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#06b6d4' }}>
          DataForge
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['demo', 'workflow', 'tech', 'team'].map(section => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              style={{
                background: 'none',
                border: 'none',
                color: '#f8fafc',
                cursor: 'pointer',
                fontSize: '1rem',
                textTransform: 'capitalize',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#06b6d4'}
              onMouseLeave={(e) => e.target.style.color = '#f8fafc'}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;