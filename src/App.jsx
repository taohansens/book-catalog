import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookListView from "./views/BookListView";
import BookDetailsView from "./views/BookDetailsView";
import AddBookView from "./views/AddBookView";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BookListView />} />
        <Route path="/book/:id" element={<BookDetailsView />} />
        <Route path="/add-book" element={<AddBookView />} />
      </Routes>
    </>
  );
}

export default App;
