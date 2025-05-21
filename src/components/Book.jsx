import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Book = ({ book, onToggleFavorite, isFavorite }) => (
  <Card className="h-100">
    <Card.Body className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <Card.Title>
            <Link to={`/book/${book.id}`} className="text-decoration-none">
              {book.title}
            </Link>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {book.author}
          </Card.Subtitle>
          <Card.Text className="text-muted">
            {book.genre}
          </Card.Text>
        </div>
        <Button
          variant="link"
          className="p-0 text-decoration-none"
          onClick={() => onToggleFavorite(book)}
          aria-label={isFavorite ? 'Desfavoritar' : 'Favoritar'}
        >
          {isFavorite ? (
            <AiFillHeart className="text-danger fs-4" />
          ) : (
            <AiOutlineHeart className="text-secondary fs-4" />
          )}
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default Book;
