import { useState, useEffect } from "react";
import { getCategorias } from "../services/categoriaService";

const FunkoForm = ({ onGuardar, funko, modalId }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: "",
    tipo: "",
    categoriaId: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const cargarCategorias = async () => {
      const data = await getCategorias();
      setCategorias(data);
    };
    cargarCategorias();
  }, []);

  useEffect(() => {
    if (funko) {
      setForm({
        nombre: funko.nombre || "",
        descripcion: funko.descripcion || "",
        precio: funko.precio || "",
        imagen: funko.imagen || "",
        stock: funko.stock || "",
        tipo: funko.tipo || "",
        categoriaId: funko.categoriaId || "",
      });
    }
  }, [funko]);

  useEffect(() => {
    if (!funko) {
      setForm({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
        stock: "",
        tipo: "",
        categoriaId: "",
      });
      setErrores({});
    }
  }, [modalId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const errores = {};
    if (!form.nombre.trim()) errores.nombre = "El nombre es obligatorio";
    if (!form.descripcion.trim()) errores.descripcion = "La descripción es obligatoria";
    if (!form.precio || form.precio <= 0) errores.precio = "El precio debe ser mayor a 0";
    if (!form.stock || form.stock < 0) errores.stock = "El stock no puede ser negativo";
    if (!form.tipo) errores.tipo = "Seleccioná un tipo";
    if (!form.categoriaId) errores.categoriaId = "Seleccioná una categoría";
    return errores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidados = validar();
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      return;
    }

    setErrores({});
    onGuardar(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label">Nombre <span className="text-danger">*</span></label>
        <input
          className="form-control"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        {errores.nombre && <div className="text-danger">{errores.nombre}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">Descripción <span className="text-danger">*</span></label>
        <textarea
          className="form-control"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />
        {errores.descripcion && <div className="text-danger">{errores.descripcion}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">Precio <span className="text-danger">*</span></label>
        <input
          className="form-control"
          name="precio"
          type="number"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
        />
        {errores.precio && <div className="text-danger">{errores.precio}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">Stock <span className="text-danger">*</span></label>
        <input
          className="form-control"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
        />
        {errores.stock && <div className="text-danger">{errores.stock}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">URL de imagen</label>
        <input
          className="form-control"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          placeholder="URL de imagen"
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Tipo <span className="text-danger">*</span></label>
        <select
          className="form-select"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          style={{ color: form.tipo ? "#000" : "#6c757d" }}
        >
          <option value="">Seleccionar tipo</option>
          <option value="Original">Original</option>
          <option value="Replica">Réplica</option>
          <option value="Llavero">Llavero</option>
        </select>
        {errores.tipo && <div className="text-danger">{errores.tipo}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría <span className="text-danger">*</span></label>
        <select
          className="form-select"
          name="categoriaId"
          value={form.categoriaId}
          onChange={handleChange}
          style={{ color: form.categoriaId ? "#000" : "#6c757d" }}
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((c) => (
            <option key={c._id} value={c._id}>
              {c.categoria || c.nombre}
            </option>
          ))}
        </select>
        {errores.categoriaId && <div className="text-danger">{errores.categoriaId}</div>}
      </div>

      <button className="btn btn-primary w-100" type="submit">
        Guardar
      </button>
    </form>
  );
};

export default FunkoForm;
