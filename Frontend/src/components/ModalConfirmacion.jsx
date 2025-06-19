import { useEffect } from "react";

// Función de modal de confirmación reutilizable
const ModalConfirmacion = ({ visible, onConfirmar, onCancelar, mensaje }) => {
  useEffect(() => {
    if (visible) {
      const modal = new window.bootstrap.Modal(document.getElementById("modalConfirmacion"));
      modal.show();
    }
  }, [visible]);

  return (
    // Estructura de la modal de confirmación (Use Bootstrap)
    <div
      className="modal fade"
      id="modalConfirmacion"
      tabIndex="-1"
      aria-labelledby="modalConfirmacionLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title" id="modalConfirmacionLabel">Confirmar acción</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div className="modal-body">
            {mensaje || "¿Estás seguro de continuar con esta acción?"}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onCancelar}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onConfirmar}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
