// src/CatContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CatContext = createContext();

export const CatProvider = ({ children }) => {
  
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    // pega a lista de raças ao carregar a pagina
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        setBreeds(response.data);
      } catch (error) {
        console.error('Erro ao buscar lista de raças:', error);
      }
    };

    fetchBreeds();
  }, []);

  return (
    <CatContext.Provider value={{breeds}}>
      {children}
    </CatContext.Provider>
  );
};
