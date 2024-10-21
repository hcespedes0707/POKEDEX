const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const multer = require('multer');
const path = require('path');

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imagenes');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Rutas para CRUD de Pokémon
router.get('/', pokemonController.getAllPokemons);
router.post('/', upload.single('image'), pokemonController.addPokemon);
router.put('/:id', upload.single('image'), pokemonController.updatePokemon);
router.delete('/:id', pokemonController.deletePokemon);

module.exports = router;
