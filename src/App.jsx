import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

const App = () => (
  <div>
    <Header />
<Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
  </div>
);

export default App;
