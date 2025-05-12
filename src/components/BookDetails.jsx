import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

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

  if (!book) {
    return <p className="p-4 text-gray-600">Carregando detalhes do livro...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-xl mb-2"><strong>Autor:</strong> {book.author}</p>
      <p className="text-lg mb-2"><strong>Gênero:</strong> {book.genre}</p>
      <p className="text-gray-700">{book.description}</p>
      <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg">
        Voltar para a Lista
      </Link>
    </div>
  );
};

export default BookDetails;
