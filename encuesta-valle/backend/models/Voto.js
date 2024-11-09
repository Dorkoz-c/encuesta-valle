const mongoose = require('mongoose');

const votoSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 8
  },
  comentario: {
    type: String,
    required: true,
    maxlength: 120
  },
  valoracion: {
    type: Number,
    required: true,
    enum: [-1, +2]
  },
  candidato: {
    type: String,
    required: true,
    enum: ['David', 'Jonathan'],
  }
});

module.exports = mongoose.model('Voto', votoSchema);
