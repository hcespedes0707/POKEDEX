const TypeModel = require('../models/typeModel');

// Obtener todos los tipos de Pokémon
const getAllTypes = (req, res) => {
  TypeModel.getAllTypes((err, types) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los tipos' });
    res.json(types);
  });
};

// Agregar tipo
const addType = (req, res) => {
  const newType = req.body;
  TypeModel.addType(newType, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al agregar tipo' });
    res.status(201).json({ message: 'Tipo agregado con éxito', id: result.insertId });
  });
};

// Actualizar tipo
const updateType = (req, res) => {
  const { id } = req.params;
  const updatedType = req.body;

  TypeModel.updateType(id, updatedType, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar tipo' });
    res.json({ message: 'Tipo actualizado con éxito' });
  });
};

// Eliminar tipo
const deleteType = (req, res) => {
  const { id } = req.params;
  TypeModel.deleteType(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar tipo' });
    res.json({ message: 'Tipo eliminado con éxito' });
  });
};

module.exports = {
  getAllTypes,
  addType,
  updateType,
  deleteType
};
