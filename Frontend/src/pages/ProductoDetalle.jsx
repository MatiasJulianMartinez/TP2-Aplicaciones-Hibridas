import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getFunkos } from "../services/funkoService";
import { getCategorias } from "../services/categoriaService";
import { AuthContext } from "../context/AuthContext";

// Función de detalle de un Funko específico, incluyendo imagen, descripción, precio, stock y categoría.
const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // Estados locales para el funko seleccionado y las categorías
  const [funko, setFunko] = useState(null);
  const [categorias, setCategorias] = useState([]);

  // Función que carga los datos del Funko y sus categorías 
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [dataFunkos, dataCategorias] = await Promise.all([
          getFunkos(token),
          getCategorias(token),
        ]);

        setCategorias(dataCategorias);
        const seleccionado = dataFunkos.find((f) => f._id === id);
        setFunko(seleccionado);
      } catch (error) {
        console.error("Error al cargar los datos del producto:", error);
      }
    };

    if (token) cargarDatos();
  }, [id, token]);

  if (!funko) return <p className="text-center mt-5">Cargando producto...</p>;

  // Función que obtiene el nombre de la categoría según el ID del Funko
  const categoriaNombre =
    categorias.find((cat) => cat._id === funko.categoria)?.nombre ||
    "Sin categoría";

 
  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="row w-100" style={{ maxWidth: "1100px" }}>
        <div className="col-md-6 mb-4">
          <div className="p-4 bg-light rounded shadow-sm text-center">
            <img
              src={funko.imagen}
              alt={funko.nombre}
              className="img-fluid"
              style={{ maxHeight: "480px", objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-3">{funko.nombre}</h2>

          <p className="fs-5 mb-2"><strong>Descripción:</strong> {funko.descripcion}</p>
          <p className="fs-5 mb-2"><strong>Precio:</strong> ${funko.precio}</p>
          <p className="fs-5 mb-2"><strong>Stock:</strong> {funko.stock}</p>
          <p className="fs-5 mb-2"><strong>Categoría:</strong> {funko.categoria}</p>
          <p className="fs-5 mb-4"><strong>Tipo de Funko:</strong> {funko.tipo}</p>

          <div className="d-flex gap-2">
            <button
              className="btn btn-success w-100"
              onClick={() =>
                alert(`Agregado "${funko.nombre}" al carrito (simulado)`)
              }
            >
              Agregar al carrito
            </button>
          </div>

          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate("/tienda")}
          >
            ← Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
