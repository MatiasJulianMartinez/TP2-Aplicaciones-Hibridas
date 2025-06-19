// Función de la Card de categoría con botones de editar y eliminar
const CategoriaCard = ({ categoria, onEditar, onEliminar }) => {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{categoria.nombre}</h5>
        <p className="card-text">{categoria.descripcion}</p>
        <ul className="list-unstyled small mb-3">
          {categoria.tags && categoria.tags.length > 0 && (
            <li>
              <strong>Tags:</strong> {categoria.tags.join(", ")}
            </li>
          )}
          {categoria.paisOrigen && (
            <li>
              <strong>Origen:</strong> {categoria.paisOrigen}
            </li>
          )}
          {categoria.material && (
            <li>
              <strong>Material:</strong> {categoria.material}
            </li>
          )}
        </ul>

        {/* Botones de Editar y Eliminar, que ejecutan las funciones recibidas por props */}
        <div className="d-flex justify-content-end gap-2 mt-auto">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => onEditar(categoria)}
          >
            Editar
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onEliminar(categoria._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriaCard;
