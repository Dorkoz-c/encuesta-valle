const express = require('express');
const router = express.Router();
const Voto = require('../models/Voto');

// Lista de palabras prohibidas
const palabrasProhibidas = ["manzana", "coliflor", "bombilla", "derecha", "izquierda", "rojo", "azul"];

// Ruta para guardar un voto
router.post('/', async (req, res) => {
    try {
        const { nickname, comentario, valoracion, candidato } = req.body;
        console.log("Datos recibidos:", { nickname, comentario, valoracion, candidato });
        // Verificar si el nickname contiene alguna palabra prohibida
        const contienePalabraProhibida = palabrasProhibidas.some(palabra => nickname.toLowerCase().includes(palabra));
        if (contienePalabraProhibida) {
            return res.status(400).json({ message: 'El nickname contiene palabras prohibidas.' });
        }

        // Crea un nuevo voto incluyendo el candidato
        const nuevoVoto = new Voto({ nickname, comentario, valoracion, candidato });
        await nuevoVoto.save(); // Guarda el voto en MongoDB

        res.status(201).json({ message: 'Voto registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar el voto:', error);
        res.status(500).json({ message: 'Error al registrar el voto' });
    }
});

// Ruta para obtener todos los votos
router.get('/', async (req, res) => {
    try {
        const votos = await Voto.find(); // Obtiene todos los votos de MongoDB
        res.status(200).json(votos);
    } catch (error) {
        console.error('Error al obtener los votos:', error);
        res.status(500).json({ message: 'Error al obtener los votos' });
    }
});

module.exports = router;
