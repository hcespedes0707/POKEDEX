import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Pokédex</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Enlace al Dashboard */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>

            {/* Enlace para Agregar Pokémon */}
            <li className="nav-item">
              <Link className="nav-link" to="/add">Agregar Pokémon</Link>
            </li>

            {/* Enlaces para Habilidades */}
            <li className="nav-item">
              <Link className="nav-link" to="/abilities">Lista de Habilidades</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-ability">Agregar Habilidad</Link>
            </li>

            {/* Enlaces para Tipos de Pokémon */}
            <li className="nav-item">
              <Link className="nav-link" to="/types">Lista de Tipos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-type">Agregar Tipo</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
