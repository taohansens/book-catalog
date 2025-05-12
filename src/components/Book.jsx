import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Book = ({ book, onToggleFavorite, isFavorite }) => (
  <div className="p-4 border rounded-lg shadow-md flex justify-between items-center">
    <div>
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-gray-700">{book.author}</p>
      <p className="text-gray-500">{book.genre}</p>
    </div>
    <button
      className="text-2xl"
      onClick={() => onToggleFavorite(book)}
      aria-label={isFavorite ? 'Desfavoritar' : 'Favoritar'}
    >
      {isFavorite ? (
        <AiFillHeart className="text-red-500" />
      ) : (
        <AiOutlineHeart className="text-gray-400" />
      )}
    </button>
  </div>
);

export default Book;
