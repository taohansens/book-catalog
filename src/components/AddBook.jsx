import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Alert } from 'react-bootstrap';
import { BookContext } from '../contexts/BookContext';
import Button from './Button';
import api from '../services/api';

const AddBook = () => {
  const navigate = useNavigate();
  const { addBook } = useContext(BookContext);
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!book.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }
    
    if (!book.author.trim()) {
      newErrors.author = 'O autor é obrigatório';
    }
    
    if (!book.genre.trim()) {
      newErrors.genre = 'O gênero é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const newBook = {
        ...book,
        id: Math.random().toString(36).substr(2, 4)
      };

      const response = await api.post('/books', newBook);

      if (response.status === 201) {
        addBook(response.data);
        setSubmitSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        throw new Error('Erro ao adicionar livro');
      }
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
      setErrors({ submit: 'Erro ao adicionar livro. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Adicionar Novo Livro</h2>
      
      {submitSuccess && (
        <Alert variant="success" className="mb-4">
          Livro adicionado com sucesso! Redirecionando...
        </Alert>
      )}

      {errors.submit && (
        <Alert variant="danger" className="mb-4">
          {errors.submit}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            Título <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Digite o título do livro"
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Autor <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Digite o nome do autor"
            isInvalid={!!errors.author}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>
            Gênero <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            placeholder="Digite o gênero do livro"
            isInvalid={!!errors.genre}
          />
          <Form.Control.Feedback type="invalid">
            {errors.genre}
          </Form.Control.Feedback>
        </Form.Group>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-100"
        >
          {isSubmitting ? 'Adicionando...' : 'Adicionar Livro'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddBook; 