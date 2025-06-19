import { useEffect, useState, useContext } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../../services/usuarioService";
import { AuthContext } from "../../context/AuthContext";
import UsuarioCard from "../UsuarioCard";
import UsuarioForm from "../UsuarioForm";
import ModalMensaje from "../ModalMensaje";
import ModalConfirmacion from "../ModalConfirmacion";

const UsuarioAdmin = () => {
  // Estados principales para manejar token, lista de usuarios, edición y errores
  const { token } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [error, setError] = useState("");
  const [modalId, setModalId] = useState(Date.now());

  // Estados para manejar el modal de mensajes informativos
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ titulo: "", mensaje: "" });

  // Estados para controlar el modal de confirmación
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

  // Función para cargar los usuarios desde el backend
  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios(token);
      setUsuarios(data);
    } catch (err) {
      setError("No se pudieron cargar los usuarios");
    }
  };

  // Carga usuarios cuando se obtiene un token válido
  useEffect(() => {
    if (token) cargarUsuarios();
  }, [token]);

  // Función para guardar un usuario nuevo o actualizar uno existente
  const handleGuardar = async (form) => {
    try {
      if (modoEdicion && usuarioEditando) {
        await updateUsuario(usuarioEditando._id, form, token);
        mostrarModal("Éxito", "Usuario actualizado correctamente");
      } else {
        await createUsuario(form, token);
        mostrarModal("Éxito", "Usuario creado correctamente");
      }

      await cargarUsuarios(); // Actualiza la lista luego de guardar
      setModoEdicion(false);
      setUsuarioEditando(null);
      document.getElementById("cerrarModalUsuario")?.click(); // se cierra el modal
    } catch (err) {
      mostrarModal("Error", "Error al guardar el usuario");
    }
  };

  // Función para abrir el formulario de edición de un usuario
  const handleEditar = (usuario) => {
    setModoEdicion(true);
    setUsuarioEditando(usuario);
    const modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
    modal.show();
  };

  // Limpia el formulario para registrar un nuevo usuario
  const handleCrear = () => {
    setModoEdicion(false);
    setUsuarioEditando(null);
    setModalId(Date.now());
  };

  // Función para eliminar un usuario
  const handleEliminar = (id) => {
    confirmarAccion(async () => {
      try {
        await deleteUsuario(id, token);
        await cargarUsuarios();
        mostrarModal("Eliminado", "Usuario eliminado correctamente");
      } catch (err) {
        mostrarModal("Error", "No se pudo eliminar el usuario.");
      }
    });
  };

  return (
    <>
      {/* Boton para agregar usuario */}
      <div className="text-center mb-3">
        <h2 className="text-center mb-4">👤 Gestión de Usuarios</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalUsuario"
          onClick={handleCrear}
        >
          ➕ Crear nuevo Usuario
        </button>
      </div>

      {/* Listado de usuarios */}
      <div className="row">
        {usuarios.map((u) => (
          <div className="col-md-4" key={u._id}>
            <UsuarioCard
              usuario={u}
              onEditar={handleEditar}
              onEliminar={() => handleEliminar(u._id)}
            />
          </div>
        ))}
      </div>

      {/* Modal de creación/edición de usuario */}
      <div
        className="modal fade"
        id="modalUsuario"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {modoEdicion ? "Editar Usuario" : "Nuevo Usuario"}
              </h5>
              <button
                id="cerrarModalUsuario"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <UsuarioForm
                onGuardar={handleGuardar}
                usuario={modoEdicion ? usuarioEditando : null}
                modalId={modalId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de mensajes  */}
      <ModalMensaje
        titulo={modalData.titulo}
        mensaje={modalData.mensaje}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* Modal para confirmar eliminar */}
      <ModalConfirmacion
        visible={modalConfirmVisible}
        mensaje="¿Estás seguro de eliminar este usuario?"
        onCancelar={() => setModalConfirmVisible(false)}
        onConfirmar={() => {
          setModalConfirmVisible(false);
          accionConfirmada();
        }}
      />
    </>
  );
};

export default UsuarioAdmin;
