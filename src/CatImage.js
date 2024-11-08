import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Container, Modal, Image, Form, Alert, Badge } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import { CatContext } from './CatContext';

function CatImage() {
  const {breeds } = useContext(CatContext);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchCatImages = async () => {
    if (quantity < 1 || quantity > 10) {
      setError('Por favor, insira uma quantidade entre 1 e 10.');
      return;
    }
    setError('');

    const breedIds = selectedBreeds.join(',');

    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=${quantity}${breedIds ? `&breed_ids=${breedIds}` : ''}`
      );
      setImages(response.data.slice(0, quantity)); //a API traz apenas ou 1 ou 10 de uma vez, talvez seja um bug, essa é a solução para contornar isso
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
      setError('Erro ao buscar as imagens. Tente novamente.');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setImages([]);
  };

  // Adiciona raça selecionada à lista de query
  const handleBreedSelect = (e) => {
    const selectedBreed = e.target.value;
    if (selectedBreed && !selectedBreeds.includes(selectedBreed)) {
      setSelectedBreeds([...selectedBreeds, selectedBreed]);
    }
  };

  // Remove uma raça da lista de query
  const removeBreed = (breed) => {
    setSelectedBreeds(selectedBreeds.filter((item) => item !== breed));
  };

  //-------- Modal para exibir as imagens de gatos e o botão de nova busca --------------
  const CatImagesModal = () => (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Imagens de Gatos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {images.map((image) => (
          <Image key={image.id} src={image.url} alt="Gato" fluid className="mb-3" />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
        <Button variant="primary" onClick={fetchCatImages}>Nova Busca</Button>
      </Modal.Footer>
    </Modal>
  );

  //----------------- Pagina Principal --------------------------

  return (
    <Container className="text-center my-5">
      <Form>
        <Form.Group>
          <Form.Label>Selecione as Raças (opcional)</Form.Label>
          <Form.Control as="select" onChange={handleBreedSelect}>
            <option value="">Escolha uma raça</option>
            {breeds.map((breed) => (
              <option key={breed.id} value={breed.id}>{breed.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Exibe as raças selecionadas como tags */}
        <div className="mt-3">
          {selectedBreeds.map((breedId) => {
            const breed = breeds.find((b) => b.id === breedId);
            return (
              <Badge
                key={breedId}
                pill
                variant="primary"
                className="mr-2 mb-2"
                style={{ padding: '0.5rem', cursor: 'pointer' }}
                onClick={() => removeBreed(breedId)}
              >
                {breed?.name} <span style={{ marginLeft: '0.5rem', color: 'white' }}>×</span>
              </Badge>
            );
          })}
        </div>

        <Form.Group className="mt-3">
          <Form.Label>Quantidade de Imagens (1 a 10)</Form.Label>
          <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" max="10" />
        </Form.Group>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
      <Button variant="primary" onClick={fetchCatImages} size="lg" className="mt-3">
        Buscar Imagens
      </Button>
      {showModal && createPortal(<CatImagesModal />, document.body)}
    </Container>
  );
}

export default CatImage;
