const Book = ({ book }) => (
  <div className="p-4 border rounded-lg shadow-md">
    <h2 className="text-xl font-semibold">{book.title}</h2>
    <p className="text-gray-700">{book.author}</p>
    <p className="text-gray-500">{book.genre}</p>
  </div>
);

export default Book;
