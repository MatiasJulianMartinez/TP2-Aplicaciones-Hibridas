import { useState } from 'react';
import { registrarUsuario } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // Estado del formulario con campos controlados
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Estado para almacenar errores de validación por campo
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  // Actualiza el estado del formulario y limpia errores 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
    setErrorGeneral('');
  };

  // Comprueba todos los campos del formulario y devuelve un objeto con mensajes de error
  const validar = () => {
    const nuevosErrores = {};

    if (!form.name.trim()) {
      nuevosErrores.name = "El nombre es obligatorio";
    }

    if (!form.email.trim()) {
      nuevosErrores.email = "El correo es obligatorio";
    } else if (!form.email.includes("@") || !form.email.includes(".")) {
      nuevosErrores.email = "El correo no es válido";
    }

    if (!form.password) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      nuevosErrores.password = "Debe tener al menos 6 caracteres";
    }

    if (form.password !== form.confirmPassword) {
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden";
    }

    return nuevosErrores;
  };

  // Evita el envío por defecto, valida campos y llama al registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresValidados = validar();
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      return;
    }

    try {
      await registrarUsuario(form);       
      navigate('/ingresar');              
    } catch (err) {
      setErrorGeneral("Error al registrar"); 
    }
  };


  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Registrarse</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Campo Nombre */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className={`form-control ${errores.name ? "is-invalid" : ""}`}
            placeholder="Juan Pérez"
            value={form.name}
            onChange={handleChange}
          />
          {errores.name && <div className="invalid-feedback">{errores.name}</div>}
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form-control ${errores.email ? "is-invalid" : ""}`}
            placeholder="ejemplo@correo.com"
            value={form.email}
            onChange={handleChange}
          />
          {errores.email && <div className="invalid-feedback">{errores.email}</div>}
        </div>

        {/* Campo Contraseña */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña <span className="text-danger">*</span>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className={`form-control ${errores.password ? "is-invalid" : ""}`}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
          {errores.password && <div className="invalid-feedback">{errores.password}</div>}
        </div>

        {/* Campo Confirmar Contraseña */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Repetir Contraseña <span className="text-danger">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            className={`form-control ${errores.confirmPassword ? "is-invalid" : ""}`}
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errores.confirmPassword && (
            <div className="invalid-feedback">{errores.confirmPassword}</div>
          )}
        </div>

        {/* Error general de registro */}
        {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}

        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
