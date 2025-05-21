import React from 'react';
import { Form } from 'react-bootstrap';

const GenreFilter = ({ genres, selectedGenre, onSelectGenre }) => (
  <Form.Group className="mb-4">
    <Form.Label>Filtrar por Gênero:</Form.Label>
    <Form.Select
      value={selectedGenre}
      onChange={(e) => onSelectGenre(e.target.value)}
    >
      <option key="all" value="">Todos</option>
      {genres.map((genre, index) => (
        <option key={`${genre}-${index}`} value={genre}>
          {genre}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
);

export default GenreFilter;