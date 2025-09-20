import React, { useState } from 'react';
import Imput from './Imput';
import Boton from './Boton';
import Contrasena from './Contrasena';
import BotonRedes from './BotonRedes';

const FormularioRegistro = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  const [errores, setErrores] = useState({});
  const [estaEnviando, setEstaEnviando] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario(prev => ({
      ...prev,
      [name]: value
    }));

    if (errores[name]) {
      validarCampo(name, value);
    }
  };

  const validarCampo = (nombreCampo, valor) => {
    let esValido = true;

    switch (nombreCampo) {
      case 'nombre':
        if (!valor.trim()) {
          setErrores(prev => ({ ...prev, nombre: 'El nombre es obligatorio' }));
          esValido = false;
        } else if (valor.trim().length < 2) {
          setErrores(prev => ({ ...prev, nombre: 'El nombre debe tener al menos 2 caracteres' }));
          esValido = false;
        } else {
          setErrores(prev => {
            const nuevosErrores = { ...prev };
            delete nuevosErrores.nombre;
            return nuevosErrores;
          });
        }
        break;

      case 'correo':
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!valor.trim()) {
          setErrores(prev => ({ ...prev, correo: 'El correo es obligatorio' }));
          esValido = false;
        } else if (!regexEmail.test(valor)) {
          setErrores(prev => ({ ...prev, correo: 'Formato de correo inválido' }));
          esValido = false;
        } else {
          setErrores(prev => {
            const nuevosErrores = { ...prev };
            delete nuevosErrores.correo;
            return nuevosErrores;
          });
        }
        break;

      case 'contrasena':
        if (!valor) {
          setErrores(prev => ({ ...prev, contrasena: 'La contraseña es obligatoria' }));
          esValido = false;
        } else if (valor.length < 8) {
          setErrores(prev => ({ ...prev, contrasena: 'Mínimo 8 caracteres' }));
          esValido = false;
        } else {
          setErrores(prev => {
            const nuevosErrores = { ...prev };
            delete nuevosErrores.contrasena;
            return nuevosErrores;
          });
        }
        break;

      default:
        break;
    }

    return esValido;
  };

  const validarFormulario = () => {
    let esValido = true;

    Object.keys(datosFormulario).forEach(campo => {
      if (!validarCampo(campo, datosFormulario[campo])) {
        esValido = false;
      }
    });

    return esValido;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setEstaEnviando(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('¡Registro exitoso! Bienvenido a nuestra comunidad.');
      
      console.log('📝 Datos del formulario:', {
        nombre: datosFormulario.nombre.trim(),
        correo: datosFormulario.correo.trim(),
        contrasena: '***',
        timestamp: new Date().toISOString()
      });

      setDatosFormulario({
        nombre: '',
        correo: '',
        contrasena: ''
      });
      setErrores({});

    } catch (error) {
      alert('Error al procesar el registro. Inténtalo de nuevo.');
    } finally {
      setEstaEnviando(false);
    }
  };

  const manejarLoginSocial = (proveedor) => {
    alert(`Funcionalidad de ${proveedor} en desarrollo`);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" 
         style={{
           background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
           backgroundSize: '400% 400%',
           animation: 'gradientShift 15s ease infinite'
         }}>
      
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .form-container {
          animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .header-gradient {
          background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
        }
        
        .bounce-icon {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
      `}</style>

      <div className="card form-container" style={{
        maxWidth: '420px',
        width: '100%',
        border: 'none',
        borderRadius: '24px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        overflow: 'hidden'
      }}>
        
        <div className="header-gradient text-white text-center p-4">
          <div className="mb-3">
            <i className="material-icons bounce-icon" style={{
              fontSize: '3rem',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              padding: '1rem',
              boxShadow: '0 3px 6px rgba(0,0,0,0.16)'
            }}>
              person_add
            </i>
          </div>
          <h1 className="h2 mb-2 fw-medium">Crear Cuenta</h1>
          <p className="mb-0 opacity-75">Únete a nuestra comunidad</p>
        </div>

        <div className="card-body p-4">
          <form onSubmit={manejarEnvio}>
            
            <Imput
              type="text"
              placeholder="Nombre completo"
              name="nombre"
              value={datosFormulario.nombre}
              onChange={manejarCambio}
              icon="person"
              error={errores.nombre}
              required
            />

            <Imput
              type="email"
              placeholder="Correo electrónico"
              name="correo"
              value={datosFormulario.correo}
              onChange={manejarCambio}
              icon="email"
              error={errores.correo}
              required
            />

            <Imput
              type="password"
              placeholder="Contraseña"
              name="contrasena"
              value={datosFormulario.contrasena}
              onChange={manejarCambio}
              icon="lock"
              error={errores.contrasena}
              showToggle={true}
              required
            />

            <Contrasena password={datosFormulario.contrasena} />

            <div className="mt-4">
              <Boton
                type="submit"
                variant="primary"
                size="lg"
                loading={estaEnviando}
                icon="arrow_forward"
                className="w-100"
              >
                Crear Cuenta
              </Boton>
            </div>

            <p className="text-center text-muted mt-3" style={{ fontSize: '0.8rem' }}>
              Al registrarte, aceptas nuestros{' '}
              <a href="/terminos" className="text-primary text-decoration-none">
                Términos de Servicio
              </a>{' '}
              y{' '}
              <a href="/privacidad" className="text-primary text-decoration-none">
                Política de Privacidad
              </a>
            </p>
          </form>

          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1" />
            <span className="px-3 text-muted bg-white" style={{ fontSize: '0.9rem' }}>
              o continúa con
            </span>
            <hr className="flex-grow-1" />
          </div>

          <div className="d-flex gap-2">
            <BotonRedes 
              provider="Google" 
              onClick={manejarLoginSocial}
            />
            <BotonRedes 
              provider="Facebook" 
              onClick={manejarLoginSocial}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioRegistro;