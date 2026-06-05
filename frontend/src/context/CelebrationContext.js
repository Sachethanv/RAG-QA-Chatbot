import React, { createContext, useContext, useState } from 'react';

const CelebrationContext = createContext();

export const CelebrationProvider = ({ children }) => {
  const [celebration, setCelebration] = useState({ visible: false, intensity: 1 });

  const triggerCelebration = (intensity = 1) => {
    setCelebration({ visible: true, intensity });
    setTimeout(() => {
      setCelebration({ visible: false, intensity: 1 });
    }, 4000); // 4 seconds of celebration
  };

  return (
    <CelebrationContext.Provider value={{ celebration, triggerCelebration }}>
      {children}
    </CelebrationContext.Provider>
  );
};

export const useCelebration = () => useContext(CelebrationContext);
