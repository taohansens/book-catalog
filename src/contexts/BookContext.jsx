import React, { createContext, useState, useEffect, useMemo } from 'react';
import api from '../services/api';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
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

  const addBook = (newBook) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  const removeBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  const contextValue = useMemo(
    () => ({
      books,
      favorites,
      toggleFavorite,
      addBook,
      removeBook
    }),
    [books, favorites]
  );

  return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>;
};
