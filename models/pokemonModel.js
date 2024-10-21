const db = require('../config/db');

// Obtener todos los Pokémon
const getAllPokemons = (callback) => {
  const query = `
    SELECT p.*, t.name AS type
    FROM pokemons p
    LEFT JOIN types t ON p.typeId = t.id
  `;
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Obtener Pokémon por ID
const getPokemonById = (id, callback) => {
  db.query('SELECT * FROM pokemons WHERE id = ?', [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

// Agregar un Pokémon
const addPokemon = (pokemon, abilities, callback) => {
  const query = 'INSERT INTO pokemons SET ?';
  db.query(query, pokemon, (err, result) => {
    if (err) return callback(err);
    const pokemonId = result.insertId;
    const abilityQueries = abilities.map(abilityId => {
      return new Promise((resolve, reject) => {
        const abilityQuery = 'INSERT INTO pokemon_abilities SET ?';
        db.query(abilityQuery, { pokemonId, abilityId }, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    });

    Promise.all(abilityQueries)
      .then(() => callback(null, result))
      .catch(err => callback(err));
  });
};

// Actualizar un Pokémon
const updatePokemon = (id, pokemon, abilities, callback) => {
  const query = 'UPDATE pokemons SET ? WHERE id = ?';
  db.query(query, [pokemon, id], (err, result) => {
    if (err) return callback(err);

    // Eliminar habilidades anteriores y agregar las nuevas
    const deleteQuery = 'DELETE FROM pokemon_abilities WHERE pokemonId = ?';
    db.query(deleteQuery, [id], (deleteErr) => {
      if (deleteErr) return callback(deleteErr);

      const abilityQueries = abilities.map(abilityId => {
        return new Promise((resolve, reject) => {
          const abilityQuery = 'INSERT INTO pokemon_abilities SET ?';
          db.query(abilityQuery, { pokemonId: id, abilityId }, (err) => {
            if (err) reject(err);
            resolve();
          });
        });
      });

      Promise.all(abilityQueries)
        .then(() => callback(null, result))
        .catch(err => callback(err));
    });
  });
};

// Eliminar un Pokémon
const deletePokemon = (id, callback) => {
  const query = 'DELETE FROM pokemons WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  getAllPokemons,
  getPokemonById,
  addPokemon,
  updatePokemon,
  deletePokemon
};
