import { useEffect, useState } from "react";
import { getCategorias } from "../../services/categoriaService";
import { Link } from "react-router-dom";

// Componente que muestra un resumen visual de las primeras 3 categorías disponibles
const CategoriasDestacadas = () => {
  const [categorias, setCategorias] = useState([]);

   // Carga inicial de las categorías desde el servicio, solo las primeras 3
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data.slice(0, 3));  // Se muestran solo 3 categorías destacadas
      } catch (err) {
        console.error("Error al cargar categorías:", err.message);
      }
    };
    cargar();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">🗂️ Categorías Destacadas</h2>
        <div className="row g-4">
          {categorias.map((cat) => (
            <div className="col-md-4" key={cat._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{cat.nombre}</h5>
                  <p className="card-text text-muted">
                    {cat.descripcion || "Sin descripción"}
                  </p>
                  <ul className="list-unstyled small mb-3">
                    {cat.paisOrigen && (
                      <li>
                        <strong>Origen:</strong> {cat.paisOrigen}
                      </li>
                    )}
                    {cat.material && (
                      <li>
                        <strong>Material:</strong> {cat.material}
                      </li>
                    )}
                    {cat.tags && cat.tags.length > 0 && (
                      <li>
                        <strong>Tags:</strong> {cat.tags.slice(0, 3).join(", ")}
                      </li>
                    )}
                  </ul>
                  <div className="mt-auto">
                    <Link
                      to={`/tienda?categoria=${cat._id}`}
                      className="btn btn-primary btn-sm w-100"
                    >
                      Ver productos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {categorias.length === 0 && (
            <p className="text-center text-muted">
              No hay categorías disponibles.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoriasDestacadas;
