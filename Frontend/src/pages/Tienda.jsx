import { useEffect, useState, useContext } from "react";
import { getFunkos } from "../services/funkoService";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

// Muestra el catálogo de Funkos y permite filtrar por categoría
const Tienda = () => {
  const { token } = useContext(AuthContext);
  const [funkos, setFunkos] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaFiltrada = params.get("categoria");

  // Función que llama al servicio y guarda los Funkos en el estado
  const cargarFunkos = async () => {
    try {
      const data = await getFunkos(token);
      setFunkos(data);
    } catch (err) {
      console.error("Error al cargar los funkos:", err);
    }
  };

  // Al montar el componente (o cambiar el token), ejecuta la carga de los funkos
  useEffect(() => {
    if (token) cargarFunkos();
  }, [token]);

  // Si hay categoría filtrada, solo se muestran esos Funkos
  const funkosFiltrados = categoriaFiltrada
    ? funkos.filter((f) => f.categoriaId === categoriaFiltrada)
    : funkos;


  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Catálogo de Funkos</h2>

     
      {categoriaFiltrada && (
        <p className="text-center text-muted mb-4">
          Mostrando productos de una categoría seleccionada.{" "}
          <Link to="/tienda">Ver todos</Link>
        </p>
      )}

      <div className="row">
        {funkosFiltrados.map((f) => (
          // Tarjeta de un Funko: imagen, nombre, descripción, precio y enlace a detalle
          <div className="col-md-4 mb-4" key={f._id}>
            <div className="card-funko shadow-sm border-0">
              <img src={f.imagen} className="imagen-funko" alt={f.nombre} />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold mb-2 text-center">
                    {f.nombre}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Descripción:</strong> {f.descripcion}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Precio:</strong> ${f.precio}
                  </p>
                </div>
                <Link
                  to={`/producto/${f._id}`}
                  className="btn btn-outline-primary w-100"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Cuando no hay Funkos que mostrar */}
        {funkosFiltrados.length === 0 && (
          <p className="text-center text-muted">No se encontraron Funkos.</p>
        )}
      </div>
    </div>
  );
};

export default Tienda;
