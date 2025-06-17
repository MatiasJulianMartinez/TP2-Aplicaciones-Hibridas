import React, { useState, useEffect, useContext } from "react";
import {
  getFunkos,
  createFunko,
  updateFunko,
  deleteFunko,
} from "../../services/funkoService";
import { AuthContext } from "../../context/AuthContext";
import FunkoCard from "../FunkoCard";
import FunkoForm from "../FunkoForm";
import ModalMensaje from "../ModalMensaje";
import ModalConfirmacion from "../ModalConfirmacion";

const FunkoAdmin = () => {
  const { token } = useContext(AuthContext);
  const [funkos, setFunkos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [funkoEditando, setFunkoEditando] = useState(null);
  const [error, setError] = useState("");
  const [modalId, setModalId] = useState(Date.now());

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ titulo: "", mensaje: "" });

  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [accionConfirmada, setAccionConfirmada] = useState(() => () => {});

  const mostrarModal = (titulo, mensaje) => {
    setModalData({ titulo, mensaje });
    setModalVisible(true);
  };

  const confirmarAccion = (callback) => {
    setAccionConfirmada(() => callback);
    setModalConfirmVisible(true);
  };

  const cargarFunkos = async () => {
    try {
      const data = await getFunkos(token);
      setFunkos(data);
    } catch (err) {
      setError("No se pudieron cargar los Funkos");
    }
  };

  useEffect(() => {
    if (token) cargarFunkos();
  }, [token]);

  const handleGuardar = async (form) => {
    try {
      if (modoEdicion && funkoEditando) {
        await updateFunko(funkoEditando._id, form, token);
        mostrarModal("Éxito", "Funko actualizado correctamente");
      } else {
        await createFunko(form, token);
        mostrarModal("Éxito", "Funko creado correctamente");
      }

      await cargarFunkos();
      setModoEdicion(false);
      setFunkoEditando(null);
      document.getElementById("cerrarModal")?.click();
    } catch (err) {
      console.error(err);
      mostrarModal("Error", "Error al guardar el Funko");
    }
  };

  const handleEditar = (funko) => {
    setModoEdicion(true);
    setFunkoEditando(funko);
    const modal = new bootstrap.Modal(document.getElementById("modalFunko"));
    modal.show();
  };

  const handleCrear = () => {
    setModoEdicion(false);
    setFunkoEditando(null);
    setModalId(Date.now());
  };

  const handleEliminar = (id) => {
    confirmarAccion(async () => {
      try {
        await deleteFunko(id, token);
        await cargarFunkos();
        mostrarModal("Eliminado", "Funko eliminado correctamente");
      } catch (err) {
        mostrarModal("Error", "No se pudo eliminar el Funko");
      }
    });
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🎯 Gestión de Funkos</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="text-center mb-4">
        <button
          className="btn btn-success shadow-sm px-4"
          data-bs-toggle="modal"
          data-bs-target="#modalFunko"
          onClick={handleCrear}
        >
          ➕ Crear nuevo Funko
        </button>
      </div>

      <div className="row g-4">
        {funkos.length === 0 ? (
          <p className="text-center text-muted">No hay Funkos cargados aún.</p>
        ) : (
          funkos.map((f) => (
            <div className="col-md-4" key={f._id}>
              <FunkoCard
                funko={f}
                onEditar={handleEditar}
                onEliminar={() => handleEliminar(f._id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Modal del Formulario */}
      <div className="modal fade" id="modalFunko" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">
                {modoEdicion ? "Editar Funko" : "Nuevo Funko"}
              </h5>
              <button
                id="cerrarModal"
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <FunkoForm
                onGuardar={handleGuardar}
                funko={modoEdicion ? funkoEditando : null}
                modalId={modalId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de mensajes */}
      <ModalMensaje
        titulo={modalData.titulo}
        mensaje={modalData.mensaje}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* Modal de confirmación */}
      <ModalConfirmacion
        visible={modalConfirmVisible}
        mensaje="¿Estás seguro de eliminar este Funko?"
        onCancelar={() => setModalConfirmVisible(false)}
        onConfirmar={() => {
          setModalConfirmVisible(false);
          accionConfirmada();
        }}
      />
    </div>
  );
};

export default FunkoAdmin;
