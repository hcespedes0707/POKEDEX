const db = require('../config/db');

// CRUD para Tipos de Pokémon
const getAllTypes = (callback) => {
  db.query('SELECT * FROM types', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const addType = (type, callback) => {
  db.query('INSERT INTO types SET ?', type, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const updateType = (id, type, callback) => {
  db.query('UPDATE types SET ? WHERE id = ?', [type, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const deleteType = (id, callback) => {
  db.query('DELETE FROM types WHERE id = ?', [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  getAllTypes,
  addType,
  updateType,
  deleteType
};
