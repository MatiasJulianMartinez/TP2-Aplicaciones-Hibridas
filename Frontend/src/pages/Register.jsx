import { useState } from 'react';
import { registrarUsuario } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
    setErrorGeneral('');
  };

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
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Nombre <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className={`form-control ${errores.name ? "is-invalid" : ""}`}
            onChange={handleChange}
            placeholder="Juan Pérez"
            value={form.name}
          />
          {errores.name && <div className="invalid-feedback">{errores.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Correo Electrónico <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form-control ${errores.email ? "is-invalid" : ""}`}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            value={form.email}
          />
          {errores.email && <div className="invalid-feedback">{errores.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Contraseña <span className="text-danger">*</span>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className={`form-control ${errores.password ? "is-invalid" : ""}`}
            onChange={handleChange}
            placeholder="••••••••"
            value={form.password}
          />
          {errores.password && <div className="invalid-feedback">{errores.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="confirmPassword">
            Repetir Contraseña <span className="text-danger">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            className={`form-control ${errores.confirmPassword ? "is-invalid" : ""}`}
            onChange={handleChange}
            placeholder="••••••••"
            value={form.confirmPassword}
          />
          {errores.confirmPassword && (
            <div className="invalid-feedback">{errores.confirmPassword}</div>
          )}
        </div>

        {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}

        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
