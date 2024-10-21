import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PokemonController } from '../controllers/PokemonController';

function PokemonDashboard() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    PokemonController.loadAllPokemon(setPokemons);
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    PokemonController.deletePokemon(id, setPokemons);
  };

  return (
    <div className="container mt-4">
      <h1>Pokédex</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar Pokémon por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-md-4">
            <div className="card mb-4">
              <img src={`http://localhost:4000/imagenes/${pokemon.image}`} className="card-img-top" alt={pokemon.name} />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <p className="card-text">Número de Pokédex: {pokemon.pokedexNumber}</p>
                <Link to={`/edit/${pokemon.id}`} className="btn btn-warning">Editar</Link>
                <button onClick={() => handleDelete(pokemon.id)} className="btn btn-danger ml-2">Eliminar</button>
                <Link to={`/detail/${pokemon.id}`} className="btn btn-info ml-2">Ver Detalles</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonDashboard;
