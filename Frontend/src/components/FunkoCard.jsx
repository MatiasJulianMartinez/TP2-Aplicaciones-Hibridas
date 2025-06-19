// Función de la Card individual con información de un Funko y botones para editar o eliminar
const FunkoCard = ({ funko, onEditar, onEliminar }) => {
  return (
    <div className="card shadow-sm h-100">
      {funko.imagen && (
        <img src={funko.imagen} alt={funko.nombre} className="imagen-funko" />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{funko.nombre}</h5>
        {funko.descripcion && (
          <p className="card-text text-muted">{funko.descripcion}</p>
        )}

        <p className="card-text mb-3">
          <strong>Precio:</strong> ${funko.precio}
          <br />
          <strong>Stock:</strong> {funko.stock}
          <br />
          <strong>Tipo:</strong> {funko.tipo}
          <br />
          <strong>Categoría:</strong> {funko.categoria}
          <br />
          <strong>Usuario:</strong> {funko.usuario}
        </p>

        {/* Botones para editar o eliminar el Funko */}
        <div className="mt-auto d-flex justify-content-between">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => onEditar(funko)}
          >
            📝 Editar
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onEliminar(funko._id)}
          >
            🗑 Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunkoCard;
