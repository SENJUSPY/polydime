import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const useTutorial = (shouldStart: boolean) => {
  useEffect(() => {
    if (!shouldStart) return;

    // Check if tutorial already shown
    const hasShown = localStorage.getItem('polydime_tutorial_shown');
    if (hasShown) return;

    const d = driver({
      showProgress: true,
      animate: true,
      steps: [
        { 
          element: '.library-upload', 
          popover: { 
            title: 'Upload Materials', 
            description: 'Start by uploading your own PDFs or study materials here.',
            side: 'bottom'
          } 
        },
        { 
          element: '.materials-tab', 
          popover: { 
            title: 'Curated Materials', 
            description: 'Access curated materials specifically for your course and branch.',
            side: 'bottom'
          } 
        },
        { 
          element: '.chatbot-toggle', 
          popover: { 
            title: 'AI Assistant', 
            description: 'Have questions? Our AI assistant is here to help you navigate.',
            side: 'left'
          } 
        }
      ]
    });

    setTimeout(() => {
      d.drive();
      localStorage.setItem('polydime_tutorial_shown', 'true');
    }, 1000);
  }, [shouldStart]);
};
