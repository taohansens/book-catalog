import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import Book from './Book';

const Favorites = ({ favorites, onToggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <Alert variant="info">
        Nenhum livro foi favoritado ainda.
      </Alert>
    );
  }

  return (
    <Row className="g-4">
      {favorites.map((book) => (
        <Col key={book.id} xs={12} md={6} lg={4}>
          <Book
            book={book}
            onToggleFavorite={onToggleFavorite}
            isFavorite={true}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Favorites;
