const db = require('../config/db');

// CRUD para Habilidades
const getAllAbilities = (callback) => {
  db.query('SELECT * FROM abilities', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const addAbility = (ability, callback) => {
  db.query('INSERT INTO abilities SET ?', ability, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const updateAbility = (id, ability, callback) => {
  db.query('UPDATE abilities SET ? WHERE id = ?', [ability, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const deleteAbility = (id, callback) => {
  db.query('DELETE FROM abilities WHERE id = ?', [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  getAllAbilities,
  addAbility,
  updateAbility,
  deleteAbility
};
