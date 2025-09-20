import React, { useState } from 'react';

const Imput = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  name, 
  icon, 
  error, 
  showToggle = false, 
  onToggle,
  required = false 
}) => {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [estaEnfocado, setEstaEnfocado] = useState(false);

  const manejarToggleContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
    if (onToggle) onToggle(!mostrarContrasena);
  };

  const tipoInput = type === 'password' && mostrarContrasena ? 'text' : type;

  return (
    <div className="mb-3">
      <div className={`input-group ${error ? 'has-validation' : ''}`}>
        {icon && (
          <span className="input-group-text">
            <i className={`material-icons ${error ? 'text-danger' : estaEnfocado ? 'text-primary' : 'text-muted'}`}>
              {icon}
            </i>
          </span>
        )}
        
        <div className="form-floating flex-grow-1">
          <input
            type={tipoInput}
            className={`form-control ${error ? 'is-invalid' : ''} ${estaEnfocado ? 'border-primary' : ''}`}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setEstaEnfocado(true)}
            onBlur={() => setEstaEnfocado(false)}
            required={required}
            style={{
              borderLeftRadius: icon ? '0' : '0.375rem',
              transition: 'all 0.3s ease'
            }}
          />
          <label htmlFor={name} className={error ? 'text-danger' : estaEnfocado ? 'text-primary' : ''}>
            {placeholder}
          </label>
        </div>

        {showToggle && type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={manejarToggleContrasena}
            style={{ borderLeft: 'none' }}
          >
            <i className="material-icons">
              {mostrarContrasena ? 'visibility_off' : 'visibility'}
            </i>
          </button>
        )}
      </div>
      
      {error && (
        <div className="invalid-feedback d-block">
          <i className="material-icons me-1" style={{ fontSize: '16px' }}>error</i>
          {error}
        </div>
      )}
    </div>
  );
};

export default Imput;