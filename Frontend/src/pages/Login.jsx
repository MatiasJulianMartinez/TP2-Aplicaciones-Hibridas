import { useState, useContext } from 'react';
import { loginUsuario } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; 

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
    setErrorGeneral('');
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio";
    } else if (!form.email.includes("@") || !form.email.includes(".")) {
      nuevosErrores.email = "El correo no es válido";
    }

    if (!form.password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      nuevosErrores.password = "Debe tener al menos 6 caracteres";
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
      const data = await loginUsuario(form.email, form.password);
      const decoded = jwtDecode(data.token);
      login(data.token, { email: form.email, role: decoded.role });

      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrorGeneral("Credenciales inválidas");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Correo Electrónico <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form-control ${errores.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
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
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          {errores.password && <div className="invalid-feedback">{errores.password}</div>}
        </div>

        {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>

      <p className="mt-3 text-center">
        ¿No tenés cuenta?{" "}
        <Link to="/registrarse" className="text-primary">
          Registrate aquí
        </Link>
      </p>
    </div>
  );
};

export default Login;
