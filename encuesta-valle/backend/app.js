const express = require('express');
const cors = require('cors');
require('./db');  // Conexión con MongoDB

const app = express();
app.use(cors());
app.use(express.json());

const votoRoutes = require('./routes/votoRoutes');
app.use('/api/votos', votoRoutes);

console.log("app instance:", app); // Verifica que 'app' sea una instancia de Express

module.exports = app;
