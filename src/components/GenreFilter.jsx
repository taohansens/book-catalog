import React from 'react';

const GenreFilter = ({ genres, selectedGenre, onSelectGenre }) => (
  <div className="p-4">
    <label htmlFor="genre-select" className="block text-gray-700 font-bold mb-2">
      Filtrar por Gênero:
    </label>
    <select
      id="genre-select"
      value={selectedGenre}
      onChange={(e) => onSelectGenre(e.target.value)}
      className="w-full p-2 border rounded-lg"
    >
      <option value="">Todos</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  </div>
);

export default GenreFilter;