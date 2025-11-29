// Advanced resume parsing utilities

export const extractPersonalInfo = (text) => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  // Extract name (usually first non-empty line that's not an email/phone)
  const name = lines.find(line => 
    line.length > 2 && 
    line.length < 50 && 
    !line.includes('@') && 
    !line.match(/\d{10}/) &&
    !line.toLowerCase().includes('resume') &&
    !line.toLowerCase().includes('cv')
  );

  // Extract email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const email = text.match(emailRegex)?.[0];

  // Extract phone
  const phoneRegex = /(?:\+91[\s-]?)?(?:\d[\s-]?){10}/g;
  const phone = text.match(phoneRegex)?.[0]?.replace(/\s|-/g, '');

  // Extract address (look for city, state patterns)
  const addressRegex = /([A-Za-z\s]+),\s*([A-Za-z\s]+),?\s*(\d{6})?/g;
  const address = text.match(addressRegex)?.[0];

  return { name, email, phone, address };
};

export const extractEducation = (text) => {
  const educationKeywords = ['education', 'academic', 'qualification', 'degree'];
  const lines = text.split('\n');
  
  let educationSection = '';
  let inEducationSection = false;
  
  for (const line of lines) {
    if (educationKeywords.some(keyword => 
      line.toLowerCase().includes(keyword)
    )) {
      inEducationSection = true;
      continue;
    }
    
    if (inEducationSection) {
      if (line.trim() === '' || 
          ['experience', 'work', 'project', 'skill'].some(keyword => 
            line.toLowerCase().includes(keyword)
          )) {
        break;
      }
      educationSection += line + '\n';
    }
  }

  // Extract degree information
  const degreeRegex = /(B\.?Tech|Bachelor|Master|M\.?Tech|MBA|BCA|MCA|B\.?E|M\.?E|B\.?Sc|M\.?Sc)[^\n]*/gi;
  const degree = educationSection.match(degreeRegex)?.[0];

  // Extract college/university
  const collegeRegex = /(college|university|institute)[^\n]*/gi;
  const college = educationSection.match(collegeRegex)?.[0];

  // Extract GPA/percentage
  const gpaRegex = /(\d\.\d+)\s*(?:GPA|CGPA)|(?:GPA|CGPA)\s*(\d\.\d+)|(\d+)\s*%/gi;
  const gpa = educationSection.match(gpaRegex)?.[0];

  // Extract graduation year
  const yearRegex = /(20\d{2})/g;
  const years = educationSection.match(yearRegex);
  const graduationYear = years?.[years.length - 1]; // Latest year

  return {
    degree,
    college,
    gpa,
    graduationYear
  };
};

export const extractSkills = (text) => {
  const skillCategories = {
    programming: ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift'],
    web: ['HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask'],
    database: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQLite'],
    cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins'],
    tools: ['Git', 'Linux', 'Windows', 'Jira', 'Confluence', 'Postman'],
    frameworks: ['Spring', 'Hibernate', 'Bootstrap', 'jQuery', 'Laravel']
  };

  const allSkills = Object.values(skillCategories).flat();
  const textLower = text.toLowerCase();
  
  const foundSkills = allSkills.filter(skill => 
    textLower.includes(skill.toLowerCase())
  );

  return [...new Set(foundSkills)]; // Remove duplicates
};