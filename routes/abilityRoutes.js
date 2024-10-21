const express = require('express');
const router = express.Router();
const abilityController = require('../controllers/abilityController');

// Rutas para CRUD de Habilidades
router.get('/', abilityController.getAllAbilities);
router.post('/', abilityController.addAbility);
router.put('/:id', abilityController.updateAbility);
router.delete('/:id', abilityController.deleteAbility);

module.exports = router;
