import React, { useState } from 'react';
import Landing from './components/Landing';
import { Library } from './components/Library';
import { Reader } from './components/Reader';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AnimatePresence, motion } from 'framer-motion';
import { Materials } from './components/Materials';

const DEFAULT_COURSE: 'btech' | 'diploma' = 'btech';
const DEFAULT_BRANCH = 'cse';

const App = () => {
  const [view, setView] = useState<'landing' | 'library' | 'materials' | 'reader'>('landing');
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<any>(null);

  const handleGetStarted = () => {
    setView('library');
  };

  const handleOpenBook = (id: string) => {
    setActiveBookId(id);
    setActiveMaterial(null);
    setView('reader');
  };

  const handleOpenMaterial = (material: any) => {
    setActiveMaterial(material);
    setActiveBookId(null);
    setView('reader');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-bg font-body selection:bg-accent/30">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Landing 
                onGetStarted={handleGetStarted} 
                onUploadClick={() => setView('library')}
              />
            </motion.div>
          )}

          {view === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Library onOpenBook={handleOpenBook} />
            </motion.div>
          )}

          {view === 'materials' && (
            <motion.div
              key="materials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Materials onOpenMaterial={handleOpenMaterial} />
            </motion.div>
          )}

          {view === 'reader' && (activeBookId || activeMaterial) && (
            <motion.div
              key="reader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              <Reader 
                bookId={activeBookId || undefined} 
                material={activeMaterial || undefined}
                onBack={() => setView(activeMaterial ? 'materials' : 'library')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

export default App;
