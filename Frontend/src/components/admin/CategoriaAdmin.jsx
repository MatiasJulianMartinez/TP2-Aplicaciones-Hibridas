import { useEffect, useState, useContext } from "react";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../../services/categoriaService";
import { AuthContext } from "../../context/AuthContext";
import CategoriaCard from "../CategoriaCard";
import CategoriaForm from "../CategoriaForm";
import ModalMensaje from "../ModalMensaje";
import ModalConfirmacion from "../ModalConfirmacion";

const CategoriaAdmin = () => {
  // Estados principales para manejar token, listado, edición y errores
  const { token } = useContext(AuthContext);
  const [categorias, setCategorias] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [modalId, setModalId] = useState(Date.now());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ titulo: "", mensaje: "" });
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [accionConfirmada, setAccionConfirmada] = useState(() => () => {});
  const [error, setError] = useState("");

  // Función para mostrar un modal de mensaje con texto personalizado
  const mostrarModal = (titulo, mensaje) => {
    setModalData({ titulo, mensaje });
    setModalVisible(true);
  };

  // Función para configurar y mostrar el modal de confirmación
  const confirmarAccion = (callback) => {
    setAccionConfirmada(() => callback);
    setModalConfirmVisible(true);
  };

  // Función para cargar las categorías desde el backend
  const cargarCategorias = async () => {
    try {
      const data = await getCategorias(token);
      setCategorias(data);
    } catch (err) {
      setError("No se pudieron cargar las categorías");
    }
  };

  // useEffect para cargar las categorias cuando haya token
  useEffect(() => {
    if (token) cargarCategorias();
  }, [token]);

  // Función para guardar una nueva categoría o actualizar una existente
  const handleGuardar = async (form) => {
    try {
      if (modoEdicion && categoriaEditando) {
        await updateCategoria(categoriaEditando._id, form, token);
        mostrarModal("Éxito", "Categoría actualizada correctamente");
      } else {
        await createCategoria(form, token);
        mostrarModal("Éxito", "Categoría creada correctamente");
      }

      await cargarCategorias(); // Actualiza la lista luego de guardar
      setModoEdicion(false);
      setCategoriaEditando(null);
      document.getElementById("cerrarModalCategoria")?.click(); // se cierra el modal
    } catch (err) {
      console.error(err);
      mostrarModal("Error", "Ocurrió un problema al guardar la categoría.");
    }
  };

  // Función para abrir el formulario de edición
  const handleEditar = (categoria) => {
    setModoEdicion(true);
    setCategoriaEditando(categoria);
    const modal = new bootstrap.Modal(
      document.getElementById("modalCategoria")
    );
    modal.show();
  };

  // Función para limpiar el formulario para la creación de una nueva categoría
  const handleCrear = () => {
    setModoEdicion(false);
    setCategoriaEditando(null);
    setModalId(Date.now());
  };

  // Función para eliminar una categoría
  const handleEliminar = (id) => {
    confirmarAccion(async () => {
      try {
        await deleteCategoria(id, token);
        await cargarCategorias();
        mostrarModal("Eliminado", "Categoría eliminada correctamente");
      } catch (err) {
        mostrarModal("Error", "No se pudo eliminar la categoría.");
      }
    });
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🗂️ Gestión de Categorías</h2>

      {/* Alerta de error si falla la carga */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Botón para crear una nueva categoría */}
      <div className="text-center mb-4">
        <button
          className="btn btn-success shadow-sm px-4"
          data-bs-toggle="modal"
          data-bs-target="#modalCategoria"
          onClick={handleCrear}
        >
          ➕ Nueva Categoría
        </button>
      </div>

      {/* Listado de tarjetas de categoría */}
      <div className="row g-4">
        {categorias.length === 0 ? (
          <p className="text-center text-muted">
            No hay categorías registradas.
          </p>
        ) : (
          categorias.map((c) => (
            <div className="col-md-4" key={c._id}>
              <CategoriaCard
                categoria={c}
                onEditar={handleEditar}
                onEliminar={() => handleEliminar(c._id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Modal con el formulario de creación o edición */}
      <div
        className="modal fade"
        id="modalCategoria"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">
                {modoEdicion ? "Editar Categoría" : "Nueva Categoría"}
              </h5>
              <button
                id="cerrarModalCategoria"
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <CategoriaForm
                onGuardar={handleGuardar}
                categoria={modoEdicion ? categoriaEditando : null}
                modalId={modalId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal para mostrar mensajes */}
      <ModalMensaje
        titulo={modalData.titulo}
        mensaje={modalData.mensaje}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* Modal para confirmar eliminar */}
      <ModalConfirmacion
        visible={modalConfirmVisible}
        mensaje="¿Estás seguro de eliminar esta categoría?"
        onCancelar={() => setModalConfirmVisible(false)}
        onConfirmar={() => {
          setModalConfirmVisible(false);
          accionConfirmada();
        }}
      />
    </div>
  );
};

export default CategoriaAdmin;
