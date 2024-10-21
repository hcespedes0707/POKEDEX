import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonController } from '../controllers/PokemonController';

function PokemonDetailView() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    PokemonController.loadPokemonById(id, setPokemon);
  }, [id]);

  if (!pokemon) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{pokemon.name}</h1>
      <img src={`http://localhost:4000/imagenes/${pokemon.image}`} alt={pokemon.name} className="img-fluid" />
      <p>Número de Pokédex: {pokemon.pokedexNumber}</p>
      <p>Descripción: {pokemon.description}</p>
      <p>Tipo: {pokemon.type}</p>
      <p>HP: {pokemon.hp}</p>
      <p>Ataque: {pokemon.attack}</p>
      <p>Defensa: {pokemon.defense}</p>
      <p>Ataque Especial: {pokemon.spAttack}</p>
      <p>Defensa Especial: {pokemon.spDefense}</p>
      <p>Velocidad: {pokemon.speed}</p>
      <p>Nivel de Evolución: {pokemon.levelEvolution}</p>
      {pokemon.prevEvolution && <p>Evolución Previa: {pokemon.prevEvolution}</p>}
      {pokemon.nextEvolution && <p>Evolución Siguiente: {pokemon.nextEvolution}</p>}
    </div>
  );
}

export default PokemonDetailView;
