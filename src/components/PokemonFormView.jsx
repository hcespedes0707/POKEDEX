import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonController } from '../controllers/PokemonController';
import { TypeAbilityController } from '../controllers/TypeAbilityController';

function PokemonFormView() {
  const [pokemon, setPokemon] = useState({
    name: '',
    pokedexNumber: '',
    description: '',
    types: [],
    abilities: [],
    hp: '',
    attack: '',
    defense: '',
    spAttack: '',
    spDefense: '',
    speed: '',
    levelEvolution: '',
    prevEvolution: '',
    nextEvolution: '',
    image: null
  });

  const [abilitiesList, setAbilitiesList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [filteredAbilities, setFilteredAbilities] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [abilitySearch, setAbilitySearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    TypeAbilityController.loadAbilities(setAbilitiesList);
    TypeAbilityController.loadTypes(setTypesList);

    if (id) {
      PokemonController.loadPokemonById(id, setPokemon);
    }

    setFilteredAbilities(abilitiesList);
    setFilteredTypes(typesList);
  }, [id, abilitiesList, typesList]);

  const handleAbilitySearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setAbilitySearch(searchValue);
    const filtered = abilitiesList.filter((ability) =>
      ability.name.toLowerCase().includes(searchValue)
    );
    setFilteredAbilities(filtered);
  };

  const handleTypeSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setTypeSearch(searchValue);
    const filtered = typesList.filter((type) =>
      type.name.toLowerCase().includes(searchValue)
    );
    setFilteredTypes(filtered);
  };

  const handleAbilityChange = (e) => {
    const selectedAbilityId = e.target.value;
    const updatedAbilities = e.target.checked
      ? [...pokemon.abilities, selectedAbilityId]
      : pokemon.abilities.filter((id) => id !== selectedAbilityId);
    setPokemon({ ...pokemon, abilities: updatedAbilities });
  };

  const handleTypeChange = (e) => {
    const selectedTypeId = e.target.value;
    const updatedTypes = e.target.checked
      ? [...pokemon.types, selectedTypeId]
      : pokemon.types.filter((id) => id !== selectedTypeId);
    setPokemon({ ...pokemon, types: updatedTypes });
  };

  const handleFileChange = (e) => {
    setPokemon({
      ...pokemon,
      image: e.target.files[0]
    });
  };

  const handleStatChange = (e) => {
    const { name, value } = e.target;
    setPokemon({
      ...pokemon,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(pokemon).forEach((key) => {
      if (key === 'abilities' || key === 'types') {
        formData.append(key, JSON.stringify(pokemon[key]));
      } else {
        formData.append(key, pokemon[key]);
      }
    });

    if (id) {
      await PokemonController.updatePokemon(id, formData, navigate);
    } else {
      await PokemonController.addNewPokemon(formData, navigate);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{id ? 'Editar Pokémon' : 'Agregar Pokémon'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Nombre y Número de Pokédex */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={pokemon.name}
              onChange={(e) => setPokemon({ ...pokemon, name: e.target.value })}
              placeholder="Nombre del Pokémon"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Número de Pokédex</label>
            <input
              type="number"
              className="form-control"
              name="pokedexNumber"
              value={pokemon.pokedexNumber}
              onChange={(e) => setPokemon({ ...pokemon, pokedexNumber: e.target.value })}
              placeholder="Número de Pokédex"
              required
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            className="form-control"
            name="description"
            value={pokemon.description}
            onChange={(e) => setPokemon({ ...pokemon, description: e.target.value })}
            placeholder="Descripción del Pokémon"
            required
          />
        </div>

        {/* Buscador y Casillas de Habilidades */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Buscar Habilidad</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Buscar habilidades..."
              value={abilitySearch}
              onChange={handleAbilitySearch}
            />
            <div className="ability-options">
              {filteredAbilities.map((ability) => (
                <div key={ability.id} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={ability.id}
                    onChange={handleAbilityChange}
                    checked={pokemon.abilities.includes(ability.id)}
                  />
                  <label className="form-check-label">{ability.name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Buscador y Casillas de Tipos */}
          <div className="col-md-6">
            <label>Buscar Tipo</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Buscar tipos..."
              value={typeSearch}
              onChange={handleTypeSearch}
            />
            <div className="type-options">
              {filteredTypes.map((type) => (
                <div key={type.id} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={type.id}
                    onChange={handleTypeChange}
                    checked={pokemon.types.includes(type.id)}
                  />
                  <label className="form-check-label">{type.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="row">
          <div className="col-md-2 mb-3">
            <label>HP</label>
            <input
              type="number"
              className="form-control"
              name="hp"
              value={pokemon.hp}
              onChange={handleStatChange}
              placeholder="HP"
              required
            />
          </div>
          <div className="col-md-2 mb-3">
            <label>Ataque</label>
            <input
              type="number"
              className="form-control"
              name="attack"
              value={pokemon.attack}
              onChange={handleStatChange}
              placeholder="Ataque"
              required
            />
          </div>
          <div className="col-md-2 mb-3">
            <label>Defensa</label>
            <input
              type="number"
              className="form-control"
              name="defense"
              value={pokemon.defense}
              onChange={handleStatChange}
              placeholder="Defensa"
              required
            />
          </div>
          <div className="col-md-2 mb-3">
            <label>Ataque Especial</label>
            <input
              type="number"
              className="form-control"
              name="spAttack"
              value={pokemon.spAttack}
              onChange={handleStatChange}
              placeholder="Ataque Especial"
              required
            />
          </div>
          <div className="col-md-2 mb-3">
            <label>Defensa Especial</label>
            <input
              type="number"
              className="form-control"
              name="spDefense"
              value={pokemon.spDefense}
              onChange={handleStatChange}
              placeholder="Defensa Especial"
              required
            />
          </div>
          <div className="col-md-2 mb-3">
            <label>Velocidad</label>
            <input
              type="number"
              className="form-control"
              name="speed"
              value={pokemon.speed}
              onChange={handleStatChange}
              placeholder="Velocidad"
              required
            />
          </div>
        </div>

        {/* Nivel de Evolución */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Nivel de Evolución</label>
            <input
              type="number"
              className="form-control"
              name="levelEvolution"
              value={pokemon.levelEvolution}
              onChange={(e) => setPokemon({ ...pokemon, levelEvolution: e.target.value })}
              placeholder="Nivel de Evolución"
            />
          </div>

          {/* Evolución Previa */}
          <div className="col-md-6">
            <label>Evolución Previa (ID)</label>
            <input
              type="text"
              className="form-control"
              name="prevEvolution"
              value={pokemon.prevEvolution}
              onChange={(e) => setPokemon({ ...pokemon, prevEvolution: e.target.value })}
              placeholder="ID del Pokémon Previo"
            />
          </div>
        </div>

        {/* Evolución Siguiente */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Evolución Siguiente (ID)</label>
            <input
              type="text"
              className="form-control"
              name="nextEvolution"
              value={pokemon.nextEvolution}
              onChange={(e) => setPokemon({ ...pokemon, nextEvolution: e.target.value })}
              placeholder="ID del Pokémon Siguiente"
            />
          </div>
        </div>

        {/* Subida de Imagen */}
        <div className="mb-4">
          <label>Imagen</label>
          <input
            type="file"
            className="form-control-file"
            onChange={handleFileChange}
          />
        </div>

        {/* Botón de Enviar */}
        <button type="submit" className="btn btn-primary btn-lg">
          {id ? 'Actualizar Pokémon' : 'Agregar Pokémon'}
        </button>
      </form>
    </div>
  );
}

export default PokemonFormView;
