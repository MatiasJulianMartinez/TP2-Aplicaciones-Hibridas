import { useEffect } from "react";

// Función de la modal de mensaje informativo reutilizable
const ModalMensaje = ({ titulo, mensaje, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const modal = new window.bootstrap.Modal(document.getElementById("modalMensaje"));
      modal.show();
    }
  }, [visible]);

  return (
    // Estructura de la modal que muestra un mensaje con botón "Aceptar"
    <div
      className="modal fade"
      id="modalMensaje"
      tabIndex="-1"
      aria-labelledby="modalMensajeLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" id="modalMensajeLabel">{titulo}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div className="modal-body">
            {mensaje}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onClose}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMensaje;
