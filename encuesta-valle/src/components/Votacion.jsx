import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Votacion.css';

const Votacion = () => {
  const [votos, setVotos] = useState([]);
  const [nickname, setNickname] = useState('');
  const [comentario, setComentario] = useState('');
  const [valoracion, setValoracion] = useState(0);
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState('');
  const [error, setError] = useState('');
  const [ganador, setGanador] = useState(null);

  const palabrasProhibidas = ["Manzana", "coliflor", "bombilla", "derecha", "izquierda", "rojo", "azul"];

  // Obtener votos desde el servidor
  const obtenerVotos = async () => {
    try {
      const response = await axios.get('https://null-valle.onrender.com/api/votos');
      console.log('Respuesta de la API:', response.data); // Verificar qué se recibe
      if (Array.isArray(response.data)) {
        setVotos(response.data);
      } else {
        setError('La respuesta no es un arreglo');
      }
    } catch (error) {
      console.error("Error al obtener los votos:", error);
      setError('Error al obtener los votos');
    }
  };

  const enviarVoto = async (e) => {
    e.preventDefault();
    setError('');
    if (palabrasProhibidas.some(palabra => nickname.toLowerCase().includes(palabra.toLowerCase()))) {
      setError('El nickname contiene una palabra prohibida. Por favor elige otro.');
      return;
    }

    if (nickname.length < 6 || nickname.length > 8) {
      setError('El nickname debe tener entre 6 y 8 caracteres.');
      return;
    }
    if (comentario.length > 120) {
      setError('El comentario no debe exceder 120 caracteres.');
      return;
    }
    if (!candidatoSeleccionado) {
      setError('Debe seleccionar a un candidato.');
      return;
    }

// Ofuscar todas las palabras prohibidas en el comentario
let comentarioOfuscado = comentario;
palabrasProhibidas.forEach(palabra => {
  const regex = new RegExp(`\\b${palabra}\\b`, 'gi'); // Regex para encontrar la palabra completa sin importar mayúsculas/minúsculas
  comentarioOfuscado = comentarioOfuscado.replace(regex, '*'.repeat(palabra.length));
});
    try {
      await axios.post('https://null-valle.onrender.com/api/votos', {
        nickname,
        comentario: comentarioOfuscado,
        valoracion,
        candidato: candidatoSeleccionado
      });
      
      const nuevoVoto = { nickname, comentario: comentarioOfuscado, valoracion: valoracion * (candidatoSeleccionado === 'David' ? 1 : -1), candidato: candidatoSeleccionado };
      setVotos([...votos, nuevoVoto]);
      setNickname('');
      setComentario('');
      setValoracion(0);
      setCandidatoSeleccionado('');
      verificarGanador([...votos, nuevoVoto]);
    } catch (error) {
      console.error("Error al registrar el voto:", error);
      setError('Error al registrar el voto');
    }
  };

  const verificarGanador = (nuevosVotos) => {
    if (nuevosVotos.length >= 10) {
      const puntuacionDavid = nuevosVotos.filter(v => v.candidato === 'David').reduce((acc, v) => acc + v.valoracion, 0);
      const puntuacionJonathan = nuevosVotos.filter(v => v.candidato === 'Jonathan').reduce((acc, v) => acc + v.valoracion, 0);
      
      if (puntuacionDavid > puntuacionJonathan) setGanador('David Larousse');
      else if (puntuacionJonathan > puntuacionDavid) setGanador('Jonathan Lowrie');
      else setGanador('Empate');
    }
  };

  const resetearEncuesta = () => {
    setGanador(null);
    setVotos([]);
  };

  useEffect(() => {
    obtenerVotos();
  }, []);

  return (
    <div className="votacion-container">
      <h1>Encuesta Null Valley: ¿A quién apoyas?</h1>

      {ganador ? (
        <div className="ganador">
          <h2>¡Ganador: {ganador}!</h2>
          <img src={ganador === 'David Larousse' ? 'David Larousse.png' : 'Jonathan Lowrie.png'} alt="Ganador" />
          <button onClick={resetearEncuesta}>Resetear Encuesta</button>
        </div>
      ) : (
        <>
          <div className="candidatos">
            <div className="candidato">
              <img src="David Larousse.png" alt="David Larousse" />
              <h3>David Larousse</h3>
              <ul>
                {votos.filter(v => v.candidato === 'David').map((v, index) => (
                  <li key={index}>{v.nickname}: {v.comentario}</li>
                ))}
              </ul>
            </div>
            <div className="candidato">
              <img src="Jonathan Lowrie.png" alt="Jonathan Lowrie" />
              <h3>Jonathan Lowrie</h3>
              <ul>
                {votos.filter(v => v.candidato === 'Jonathan').map((v, index) => (
                  <li key={index}>{v.nickname}: {v.comentario}</li>
                ))}
              </ul>
            </div>
          </div>

          <form onSubmit={enviarVoto}>
            {error && <p className="error">{error}</p>}
            <input type="text" placeholder="Nickname (6-8 caracteres)" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
            <textarea placeholder="Comentario (máx. 120 caracteres)" value={comentario} onChange={(e) => setComentario(e.target.value)} required />
            
            <label>
              <input type="radio" value="David" checked={candidatoSeleccionado === 'David'} onChange={() => setCandidatoSeleccionado('David')} />
              David Larousse
            </label>
            <label>
              <input type="radio" value="Jonathan" checked={candidatoSeleccionado === 'Jonathan'} onChange={() => setCandidatoSeleccionado('Jonathan')} />
              Jonathan Lowrie
            </label>

            <select value={valoracion} onChange={(e) => setValoracion(Number(e.target.value))}>
              <option value="0">Selecciona una valoración</option>
              <option value="-1">Negativa</option>
              <option value="2">Positiva</option>
            </select>
            
            <button type="submit">Enviar Voto</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Votacion;
