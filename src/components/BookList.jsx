import React, { useEffect, useState, useContext } from "react";
import Book from "./Book";
import GenreFilter from "./GenreFilter";
import Favorites from "./Favorites";
import { BookContext } from '../contexts/BookContext';

const BookList = () => {
  const { books, favorites, toggleFavorite } = useContext(BookContext);
  const [filteredBooks, setFilteredBooks] = React.useState(books);
  const [selectedGenre, setSelectedGenre] = React.useState('');
  const [showFavorites, setShowFavorites] = useState(false);

 useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    if (genre === '') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((book) => book.genre === genre));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold p-4">Lista de Livros</h2>
      <div className="p-4">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white"
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          Mostrar Favoritos
        </button>
      </div>
      <GenreFilter
        genres={[...new Set(books.map((book) => book.genre))]}
        selectedGenre={selectedGenre}
        onSelectGenre={handleGenreChange}
      />

      {showFavorites ? (
        <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
      ) : (
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
      )}
    </div>
  );
};

export default BookList;
