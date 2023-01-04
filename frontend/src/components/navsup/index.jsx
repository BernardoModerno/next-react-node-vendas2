import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function NavSup () {

    const { signOut } = useContext(AuthContext);

    const { user } = useContext(AuthContext);

    return (
      <Navbar bg='dark' expand='lg' variant='dark'>
          <Container>
              <Navbar.Brand as={Link} href='/dashboard' className="nav-link text-light">
                <a className='text-white-50 px-2 text-decoration-none'>Vendas</a>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='me-auto'>
                      <Nav.Link
                          className="nav-link"
                          as={Link}
                          href='/products'
                      >
                          <a className="nav-link">Produtos</a>
                      </Nav.Link>
                      <Nav.Link
                          className="nav-link"
                          as={Link}
                          href='/category'
                      >
                          <a className="nav-link">Categorias</a>
                      </Nav.Link>
                        <Nav.Link
                            className="nav-link"
                            as={Link}
                            href='/orders'
                        >
                            <a className="nav-link">Ordens de Venda</a>
                        </Nav.Link>
                  </Nav>
                  <Nav>
                      <NavDropdown
                          align='end'
                          title={user?.name}
                          id='basic-nav-dropdown'
                      >
                          <NavDropdown.Item href='#action/3.1'>
                                <p>{user?.email}</p>
                          </NavDropdown.Item>
                          <NavDropdown.Item href='#action/3.3'>
                              Configurações
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={signOut}>
                              Sair
                          </NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    )
  
}

