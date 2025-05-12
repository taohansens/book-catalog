import React from 'react';
import Book from './Book';

const Favorites = ({ favorites, onToggleFavorite }) => {
  if (favorites.length === 0) {
    return <p className="p-4 text-gray-600">Nenhum livro foi favoritado ainda.</p>;
  }

  return (
    <div className="grid gap-4 p-4">
      {favorites.map((book) => (
        <Book
          key={book.id}
          book={book}
          onToggleFavorite={onToggleFavorite}
          isFavorite={true}
        />
      ))}
    </div>
  );
};

export default Favorites;
