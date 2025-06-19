// Función de el formulario de creación o edición de usuarios
import { useState, useEffect } from "react";

const UsuarioForm = ({ onGuardar, usuario, modalId }) => {
 // Estado para los datos del formulario
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    repetirPassword: "",
    role: "cliente",
  });

  // Estado para almacenar errores de validación
  const [errores, setErrores] = useState({});

  // useEffect para cargar los datos del funko si está en modo edición
  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || usuario.name || "",
        email: usuario.email || "",
        password: "",
        repetirPassword: "",
        role: usuario.role || "cliente",
      });
    } else {
      setForm({
        nombre: "",
        email: "",
        password: "",
        repetirPassword: "",
        role: "cliente",
      });
    }

    setErrores({});
  }, [usuario, modalId]);

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Función de validación de campos
  const validar = () => {
    const newErrores = {};

    if (!form.nombre.trim()) {
      newErrores.nombre = "El nombre es obligatorio";
    }

    if (!form.email.trim()) {
      newErrores.email = "El email es obligatorio";
    } else if (!form.email.includes("@") || !form.email.includes(".")) {
      newErrores.email = "El email no es válido";
    }

    if (!usuario && (!form.password || form.password.length < 6)) {
      newErrores.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (form.password && form.password !== form.repetirPassword) {
      newErrores.repetirPassword = "Las contraseñas no coinciden";
    }

    return newErrores;
  };

  // Función para enviar el formulario si pasa la validación
  const handleSubmit = (e) => {
    e.preventDefault();

    const erroresValidacion = validar();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    // Se construye el objeto que se envia al backend
    const usuarioFinal = {
      name: form.nombre,
      email: form.email,
      role: form.role.toLowerCase().trim(),
    };

    // Solo se incluye la contraseña si fue ingresada
    if (form.password.trim() !== "") {
      usuarioFinal.password = form.password;
    }

    onGuardar(usuarioFinal);
    setErrores({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      {/* Campo: Nombre */}
      <div className="mb-3">
        <label className="form-label">Nombre<span className="text-danger">*</span></label>
        <input
          type="text"
          className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>

      {/* Campo: Email */}
      <div className="mb-3">
        <label className="form-label">Email<span className="text-danger">*</span></label>
        <input
          type="email"
          className={`form-control ${errores.email ? "is-invalid" : ""}`}
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errores.email && <div className="invalid-feedback">{errores.email}</div>}
      </div>

      {/* Campo: Contraseña */}
      <div className="mb-3">
        <label className="form-label">Contraseña{!usuario && <span className="text-danger">*</span>}</label>
        <input
          type="password"
          className={`form-control ${errores.password ? "is-invalid" : ""}`}
          name="password"
          value={form.password}
          onChange={handleChange}
          required={!usuario}
          placeholder={usuario ? "Ingresar solo si desea cambiarla" : ""}
        />
        {errores.password && <div className="invalid-feedback">{errores.password}</div>}
      </div>

      {/* Campo: Repetir contraseña */}
      <div className="mb-3">
        <label className="form-label">Repetir contraseña{!usuario && <span className="text-danger">*</span>}</label>
        <input
          type="password"
          className={`form-control ${errores.repetirPassword ? "is-invalid" : ""}`}
          name="repetirPassword"
          value={form.repetirPassword}
          onChange={handleChange}
          required={!usuario}
          placeholder={usuario ? "Ingresar solo si desea cambiarla" : ""}
        />
        {errores.repetirPassword && <div className="invalid-feedback">{errores.repetirPassword}</div>}
      </div>

      {/* Campo: Rol */}
      <div className="mb-3">
        <label className="form-label">Rol</label>
        <select
          name="role"
          className="form-select"
          value={form.role}
          onChange={handleChange}
        >
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {/* Botón de envío */}
      <button type="submit" className="btn btn-primary w-100">
        {usuario ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default UsuarioForm;
