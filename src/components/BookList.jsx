import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Book from "./Book";
import GenreFilter from "./GenreFilter";
import Favorites from "./Favorites";
import Button from "./Button";
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

  if (books.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
          <FaBook size={100} className="text-muted mb-4" />
          <h2 className="mb-3">Nenhum livro cadastrado</h2>
          <p className="text-muted mb-4">
            Comece adicionando seu primeiro livro ao catálogo!
          </p>
          <Button
            to="/add-book"
            variant="primary"
            size="lg"
            className="px-4"
          >
            Adicionar Livro
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Lista de Livros</h2>
      <div className="mb-4">
        <Button
          variant={showFavorites ? "secondary" : "primary"}
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          {showFavorites ? "Mostrar Todos" : "Mostrar Favoritos"}
        </Button>
      </div>
      <GenreFilter
        genres={[...new Set(books.map((book) => book.genre))]}
        selectedGenre={selectedGenre}
        onSelectGenre={handleGenreChange}
      />

      {showFavorites ? (
        <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
      ) : (
        <Row className="g-4">
          {filteredBooks.map((book) => (
            <Col key={book.id} xs={12} md={6} lg={4}>
              <Book
                book={book}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.some((fav) => fav.id === book.id)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BookList;
