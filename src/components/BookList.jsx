import React, { useEffect, useState } from "react";
import Book from "./Book";
import GenreFilter from "./GenreFilter";
import Favorites from "./Favorites";
import api from "../services/api";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data);
        setFilteredBooks(response.data);
        const uniqueGenres = [
          ...new Set(response.data.map((book) => book.genre)),
        ];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    if (genre === "") {
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
      <div className="p-4">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white"
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          Mostrar Favoritos
        </button>
      </div>
      <GenreFilter
        genres={genres}
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
