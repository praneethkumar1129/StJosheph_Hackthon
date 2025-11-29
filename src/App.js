import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemObjective from './components/ProblemObjective';
import Demo from './components/Demo';
import Workflow from './components/Workflow';
import TechStack from './components/TechStack';
import OutcomeLimitations from './components/OutcomeLimitations';
import Team from './components/Team';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <ProblemObjective />
      <Demo />
      <Workflow />
      <TechStack />
      <OutcomeLimitations />
      <Team />
      <Footer />
    </div>
  );
}

export default App;