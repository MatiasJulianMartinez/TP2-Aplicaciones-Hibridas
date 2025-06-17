import { useState, useEffect } from "react";

const CategoriaForm = ({ onGuardar, categoria, modalId }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tags: "",
    paisOrigen: "",
    material: "",
  });

  const [errores, setErrores] = useState({});

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria";
    if (!form.paisOrigen.trim()) nuevosErrores.paisOrigen = "El país de origen es obligatorio";
    if (!form.material.trim()) nuevosErrores.material = "El material es obligatorio";
    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const nuevaCategoria = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter((t) => t !== ""),
    };

    onGuardar(nuevaCategoria);
  };

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
