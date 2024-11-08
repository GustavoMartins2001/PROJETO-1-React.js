// src/CatContext.js
import React, { createContext, useState } from 'react';

export const CatContext = createContext();

export const CatProvider = ({ children }) => {
  const [catImageUrl, setCatImageUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <CatContext.Provider value={{ catImageUrl, setCatImageUrl, showModal, setShowModal }}>
      {children}
    </CatContext.Provider>
  );
};
