import React from 'react';

const Boton = ({ 
  children, 
  type = "button", 
  variant = "primary", 
  size = "md", 
  onClick, 
  disabled = false, 
  loading = false, 
  icon, 
  className = "" 
}) => {
  const clasesSize = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg"
  };

  const claseBoton = `btn btn-${variant} ${clasesSize[size]} ${className} d-flex align-items-center justify-content-center gap-2`;

  return (
    <button
      type={type}
      className={claseBoton}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        transition: 'all 0.3s ease',
        borderRadius: '12px',
        fontWeight: '500',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {loading ? (
        <>
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          Procesando...
        </>
      ) : (
        <>
          {children}
          {icon && (
            <i className="material-icons" style={{ fontSize: '1.2rem' }}>
              {icon}
            </i>
          )}
        </>
      )}
    </button>
  );
};

export default Boton;