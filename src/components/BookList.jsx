import React, { useEffect, useState } from 'react';
import Book from './Book';
import api from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Carregando livros...</p>;
  }

  return (
    <div className="grid gap-4 p-4">
      {books.map((book, index) => (
        <Book key={index} book={book} />
      ))}
    </div>
  );
};

export default BookList;
