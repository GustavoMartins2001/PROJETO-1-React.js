import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Container, Modal, Image, Form, Alert } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import { CatContext } from './CatContext';

function CatImage() {
  const { catImageUrl, setCatImageUrl, showModal, setShowModal } = useContext(CatContext);
  const [breed, setBreed] = useState('');
  const [error, setError] = useState('');

  const fetchCatImage = async () => {
    if (!breed) {
      setError('Por favor, insira uma raça para busca.');
      return;
    }
    setError('');

    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breed}&api_key=YOUR_API_KEY`);
      console.log(response)
      setCatImageUrl(response.data[0].url);
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
      setError('Erro ao buscar a imagem. Tente novamente.');
    }
  };

  const handleClose = () => setShowModal(false);

  const CatImageModal = () => (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Imagem de Gato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={catImageUrl} alt="Gato aleatório" fluid />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <Container className="text-center my-5">
      <Form>
        <Form.Group>
          <Form.Label>Raça do Gato</Form.Label>
          <Form.Control type="text" placeholder="Ex: beng, abys" value={breed} onChange={(e) => setBreed(e.target.value)} />
        </Form.Group>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
      <Button variant="primary" onClick={fetchCatImage} size="lg" className="mt-3">
        Buscar Imagem
      </Button>
      {showModal && createPortal(<CatImageModal />, document.body)}
    </Container>
  );
}

export default CatImage;
