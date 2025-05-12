import React, { useEffect, useState } from 'react';
import Book from './Book';
import GenreFilter from './GenreFilter';
import api from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
        setFilteredBooks(response.data);
        const uniqueGenres = [...new Set(response.data.map((book) => book.genre))];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    if (genre === '') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((book) => book.genre === genre));
    }
  };

  const toggleFavorite = (book) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === book.id)
        ? prevFavorites.filter((fav) => fav.id !== book.id)
        : [...prevFavorites, book]
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold p-4">Lista de Livros</h2>

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={handleGenreChange}
      />

      <div className="grid gap-4 p-4">
        {filteredBooks.map((book) => (
          <Book
            key={book.id}
            book={book}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.some((fav) => fav.id === book.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
