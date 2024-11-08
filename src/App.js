import React from 'react';
import './App.css';
import CatImage from './CatImage';
import { Container } from 'react-bootstrap';
import { CatProvider } from './CatContext';

function App() {
  return (
    <CatProvider>
      <Container className="text-center">
        <h1 className="my-4">Busca de Imagens de Gatos</h1>
        <CatImage />
      </Container>
    </CatProvider>
  );
}

export default App;
