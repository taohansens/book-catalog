import { Link } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';

const Header = () => (
  <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/" className="text-white">Catálogo de Livros</Navbar.Brand>
      <div className="ms-auto">
        <Button
          as={Link}
          to="/add-book"
          variant="light"
          className="text-primary"
        >
          Adicionar Livro
        </Button>
      </div>
    </Container>
  </Navbar>
);

export default Header;
