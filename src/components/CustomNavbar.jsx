import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'; // Envoltorio para enlaces de React Router
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'; // Componentes de React Bootstrap

function CustomNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Pokédex</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            {/* Enlace al Dashboard */}
            <LinkContainer to="/">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>

            {/* Enlace para Agregar Pokémon */}
            <LinkContainer to="/add">
              <Nav.Link>Agregar Pokémon</Nav.Link>
            </LinkContainer>

            {/* Dropdown para Habilidades */}
            <NavDropdown title="Habilidades" id="navbarDropdownAbilities">
              <LinkContainer to="/abilities">
                <NavDropdown.Item>Lista de Habilidades</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/add-ability">
                <NavDropdown.Item>Agregar Habilidad</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            {/* Dropdown para Tipos de Pokémon */}
            <NavDropdown title="Tipos de Pokémon" id="navbarDropdownTypes">
              <LinkContainer to="/types">
                <NavDropdown.Item>Lista de Tipos</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/add-type">
                <NavDropdown.Item>Agregar Tipo</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
