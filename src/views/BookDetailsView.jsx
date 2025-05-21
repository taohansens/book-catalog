import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Spinner, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import api from '../services/api';
import Button from '../components/Button';
import { BookContext } from '../contexts/BookContext';

const BookDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { removeBook } = useContext(BookContext);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do livro:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/books/${id}`);
      removeBook(id);
      navigate('/');
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  if (!book) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <p className="mt-2">Carregando detalhes do livro...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-4">
            <Card.Title as="h1">{book.title}</Card.Title>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              icon={FaTrash}
            >
              Deletar
            </Button>
          </div>
          <Card.Subtitle className="mb-3">
            <strong>Autor:</strong> {book.author}
          </Card.Subtitle>
          <Card.Subtitle className="mb-3">
            <strong>Gênero:</strong> {book.genre}
          </Card.Subtitle>
          {book.description && (
            <Card.Text className="mb-4">
              {book.description}
            </Card.Text>
          )}
          {book.price && (
            <Card.Text className="mb-4">
              <strong>Preço:</strong> R$ {book.price}
            </Card.Text>
          )}
          <Button
            to="/"
            variant="primary"
          >
            Voltar para a Lista
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o livro "{book.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookDetailsView; 