import React, { useEffect, useState } from 'react';
import Book from './Book';
import Favorites from './Favorites';
import api from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };

    fetchBooks();
  }, []);

  const toggleFavorite = (book) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === book.id)
        ? prevFavorites.filter((fav) => fav.id !== book.id)
        : [...prevFavorites, book]
    );
  };

  return (
    <div>
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lista de Livros</h2>
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white"
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          {showFavorites ? 'Mostrar Todos' : 'Mostrar Favoritos'}
        </button>
      </div>

      {showFavorites ? (
        <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
      ) : (
        <div className="grid gap-4 p-4">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.some((fav) => fav.id === book.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
