import { useState, useEffect } from "react";

// Función para gestionar el formulario de creacion o edicion de una categoría
const CategoriaForm = ({ onGuardar, categoria, modalId }) => {
  // Estado para los valores del formulario
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tags: "",
    paisOrigen: "",
    material: "",
  });

  // Estado para almacenar errores de validación
  const [errores, setErrores] = useState({});

   // useEffect para cargar los datos del funko si está en modo edición
  useEffect(() => {
    if (categoria) {
      setForm({
        nombre: categoria.nombre || "",
        descripcion: categoria.descripcion || "",
        tags: categoria.tags?.join(", ") || "",
        paisOrigen: categoria.paisOrigen || "",
        material: categoria.material || "",
      });
    }
  }, [categoria]);

  // Cuando cambia el ID del modal (por ej, se reinicia), limpia el formulario si no hay categoría
  useEffect(() => {
    if (!categoria) {
      setForm({
        nombre: "",
        descripcion: "",
        tags: "",
        paisOrigen: "",
        material: "",
      });
      setErrores({});
    }
  }, [modalId]);

  // Función para los cambios en los inputs del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para validar los campos obligatorios del formulario
  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria";
    if (!form.paisOrigen.trim()) nuevosErrores.paisOrigen = "El país de origen es obligatorio";
    if (!form.material.trim()) nuevosErrores.material = "El material es obligatorio";
    return nuevosErrores;
  };

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    // Procesa los tags separandolos por coma y elimina los espacios vacíos
    const nuevaCategoria = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter((t) => t !== ""),
    };

    onGuardar(nuevaCategoria); // Llamado a la función que guarda la categoría
  };

  // Función para verificar si un campo es obligatorio
  const esObligatorio = (campo) =>
    ["nombre", "descripcion", "paisOrigen", "material"].includes(campo);


  return (
    <form onSubmit={handleSubmit}>
      {["nombre", "descripcion", "tags", "paisOrigen", "material"].map((campo) => (
        <div className="mb-2" key={campo}>
          <label className="form-label">
            {campo.charAt(0).toUpperCase() + campo.slice(1).replace(/([A-Z])/g, ' $1')}
            {esObligatorio(campo) && <span className="text-danger"> *</span>}
          </label>

          {campo === "descripcion" ? (
            <textarea
              className="form-control"
              name={campo}
              value={form[campo]}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              className="form-control"
              name={campo}
              value={form[campo]}
              onChange={handleChange}
            />
          )}
          {errores[campo] && <div className="text-danger">{errores[campo]}</div>}
        </div>
      ))}

      <button type="submit" className="btn btn-success w-100">
        Guardar categoría
      </button>
    </form>
  );
};

export default CategoriaForm;
