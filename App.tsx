import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="flex flex-col h-screen font-sans text-white overflow-hidden" style={{ backgroundColor: '#1F1F1F' }}>
        <Navbar />
        <main className="flex-grow relative" style={{ zIndex: 0, overflow: 'visible' }}>
          <Landing />
        </main>
      </div>
    </LanguageProvider>
  );
};

export default App;