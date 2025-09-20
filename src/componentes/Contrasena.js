import React from 'react';

const Contrasena = ({ password }) => {
  const calcularFuerza = (contrasena) => {
    let puntuacion = 0;
    let comentario = '';
    let color = 'danger';

    if (!contrasena) {
      return { puntuacion: 0, comentario: 'Mínimo 8 caracteres', color: 'secondary' };
    }

    if (contrasena.length >= 8) puntuacion += 25;
    if (contrasena.length >= 12) puntuacion += 25;

    if (/\d/.test(contrasena)) puntuacion += 15;

    if (/[a-z]/.test(contrasena) && /[A-Z]/.test(contrasena)) puntuacion += 20;

    if (/[!@#$%^&*(),.?":{}|<>]/.test(contrasena)) puntuacion += 15;

    if (contrasena.length < 8) {
      comentario = 'Mínimo 8 caracteres';
      color = 'danger';
    } else if (puntuacion < 40) {
      comentario = 'Contraseña débil';
      color = 'danger';
    } else if (puntuacion < 70) {
      comentario = 'Contraseña media';
      color = 'warning';
    } else {
      comentario = 'Contraseña fuerte';
      color = 'success';
    }

    return { puntuacion: Math.min(puntuacion, 100), comentario, color };
  };

  const fuerza = calcularFuerza(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="progress" style={{ height: '4px', borderRadius: '2px' }}>
        <div
          className={`progress-bar bg-${fuerza.color}`}
          role="progressbar"
          style={{ 
            width: `${fuerza.puntuacion}%`,
            transition: 'all 0.3s ease'
          }}
        ></div>
      </div>
      <small className={`text-${fuerza.color} mt-1 d-block`}>
        <i className="material-icons me-1" style={{ fontSize: '14px' }}>
          {fuerza.color === 'success' ? 'check_circle' : 
           fuerza.color === 'warning' ? 'warning' : 'info'}
        </i>
        {fuerza.comentario}
      </small>
    </div>
  );
};

export default Contrasena;