const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

// Rutas
const pokemonRoutes = require('./routes/pokemonRoutes');
const abilityRoutes = require('./routes/abilityRoutes');
const typeRoutes = require('./routes/typeRoutes');

app.use('/api/pokemon', pokemonRoutes);
app.use('/api/abilities', abilityRoutes);
app.use('/api/types', typeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
