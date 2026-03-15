import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const useTutorial = (shouldStart: boolean) => {
  useEffect(() => {
    if (!shouldStart) return;

    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenTutorial) return;

    const driverObj = driver({
      showProgress: true,
      steps: [
        { element: '#library-header', popover: { title: 'Your Library', description: 'This is where all your saved books and PDFs live.' } },
        { element: '#upload-button', popover: { title: 'Upload Resources', description: 'Click here to add your own PDFs to the library.' } },
        { element: '#search-bar', popover: { title: 'Search', description: 'Quickly find any resource in your collection.' } },
        { element: '#recent-books', popover: { title: 'Recently Opened', description: 'Pick up right where you left off.' } }
      ]
    });

    driverObj.drive();
    localStorage.setItem('hasSeenTutorial', 'true');
  }, [shouldStart]);
};
