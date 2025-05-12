import Book from './Book';

const BookList = () => {
  const books = [
    { title: 'Matéria Escura', author: 'Blake Crouch', genre: 'Fantasia' },
    { title: 'Upgrade', author: 'Blake Crouch', genre: 'Fantasia' },
    { title: 'Recursão', author: 'Blake Crouch', genre: 'Fantasia' },
  ];

  return (
    <div className="grid gap-4 p-4">
      {books.map((book, index) => (
        <Book key={index} book={book} />
      ))}
    </div>
  );
};

export default BookList;
