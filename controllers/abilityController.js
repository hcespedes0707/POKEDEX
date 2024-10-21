const AbilityModel = require('../models/abilityModel');

// Obtener todas las habilidades
const getAllAbilities = (req, res) => {
  AbilityModel.getAllAbilities((err, abilities) => {
    if (err) return res.status(500).json({ error: 'Error al obtener habilidades' });
    res.json(abilities);
  });
};

// Agregar habilidad
const addAbility = (req, res) => {
  const newAbility = req.body;
  AbilityModel.addAbility(newAbility, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al agregar habilidad' });
    res.status(201).json({ message: 'Habilidad agregada con éxito', id: result.insertId });
  });
};

// Actualizar habilidad
const updateAbility = (req, res) => {
  const { id } = req.params;
  const updatedAbility = req.body;

  AbilityModel.updateAbility(id, updatedAbility, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar habilidad' });
    res.json({ message: 'Habilidad actualizada con éxito' });
  });
};

// Eliminar habilidad
const deleteAbility = (req, res) => {
  const { id } = req.params;
  AbilityModel.deleteAbility(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar habilidad' });
    res.json({ message: 'Habilidad eliminada con éxito' });
  });
};

module.exports = {
  getAllAbilities,
  addAbility,
  updateAbility,
  deleteAbility
};
