// Función de la Card con los datos de un usuario
const UsuarioCard = ({ usuario, onEditar, onEliminar }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{usuario.nombre || usuario.name}</h5>

        <p className="card-text">
          <strong>Email:</strong> {usuario.email}<br />
          <strong>Rol:</strong> {usuario.role === "admin" ? "Administrador" : "Cliente"}
        </p>

        {/* Botones de acción: editar y eliminar */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-warning btn-sm" onClick={() => onEditar(usuario)}>
            ✏️ Editar
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => onEliminar(usuario._id)}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsuarioCard;
