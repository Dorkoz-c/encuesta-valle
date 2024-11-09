const Voto = require('../models/Voto');

const palabrasProhibidas = ['manzana', 'coliflor', 'bombilla', 'derecha', 'izquierda', 'rojo', 'azul'];

const ofuscarComentario = (comentario) => {
  let comentarioOfuscado = comentario;
  palabrasProhibidas.forEach((palabra) => {
    const regex = new RegExp(palabra, 'gi');
    comentarioOfuscado = comentarioOfuscado.replace(regex, (match) => match.replace(/./g, '*'));
  });
  return comentarioOfuscado;
};

const registrarVoto = async (req, res) => {
  try {
    const { nickname, comentario, valoracion } = req.body;
    const comentarioOfuscado = ofuscarComentario(comentario);

    const nuevoVoto = new Voto({
      nickname,
      comentario: comentarioOfuscado,
      valoracion,
    });

    await nuevoVoto.save();
    res.status(201).json({ mensaje: 'Voto registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el voto:', error);
    res.status(500).json({ mensaje: 'Error al registrar el voto', error });
  }
};

module.exports = { registrarVoto };
