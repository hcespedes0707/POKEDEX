const PokemonModel = require('../models/pokemonModel');

// Obtener todos los Pokémon
const getAllPokemons = (req, res) => {
  PokemonModel.getAllPokemons((err, pokemons) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los Pokémon' });
    res.json(pokemons);
  });
};

// Agregar Pokémon
const addPokemon = (req, res) => {
  const newPokemon = req.body;
  const abilities = JSON.parse(req.body.abilities);

  if (req.file) {
    newPokemon.image = req.file.filename;
  }

  PokemonModel.addPokemon(newPokemon, abilities, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al agregar el Pokémon' });
    res.status(201).json({ message: 'Pokémon agregado con éxito', id: result.insertId });
  });
};

// Actualizar Pokémon
const updatePokemon = (req, res) => {
  const { id } = req.params;
  const updatedPokemon = req.body;
  const abilities = JSON.parse(req.body.abilities);

  if (req.file) {
    updatedPokemon.image = req.file.filename;
  }

  PokemonModel.updatePokemon(id, updatedPokemon, abilities, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar Pokémon' });
    res.json({ message: 'Pokémon actualizado con éxito' });
  });
};

// Eliminar Pokémon
const deletePokemon = (req, res) => {
  const { id } = req.params;
  PokemonModel.deletePokemon(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar Pokémon' });
    res.json({ message: 'Pokémon eliminado con éxito' });
  });
};

module.exports = {
  getAllPokemons,
  addPokemon,
  updatePokemon,
  deletePokemon
};
