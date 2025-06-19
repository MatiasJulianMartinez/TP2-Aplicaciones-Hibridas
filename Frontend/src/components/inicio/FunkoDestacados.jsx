import { useEffect, useState } from "react";
import { getFunkos } from "../../services/funkoService";
import { Link } from "react-router-dom";

// Componente que muestra una sección con los primeros 3 Funkos destacados
const FunkoDestacados = () => {
  const [funkos, setFunkos] = useState([]); 

  useEffect(() => {
     // Función que carga los Funkos desde el backend al montarse el componente
    const cargarFunkos = async () => {
      try {
        const data = await getFunkos();
        setFunkos(data.slice(0, 3));  // Muestra solo los primeros 3 funkos
      } catch (error) {
        console.error("Error al cargar funkos", error);
      }
    };
    cargarFunkos(); 
  }, []);

  return (
    <section className="py-5 bg-white">
      <div className="container text-center">
        <h2 className="mb-5 fw-bold">Funkos destacados</h2>
        <div className="row justify-content-center">
          {funkos.map((funko) => (
            <div className="col-md-4 mb-4" key={funko._id}>
              <div className="card shadow h-100 border-0">
                <img
                  src={funko.imagen}
                  className="card-img-top"
                  alt={funko.nombre}
                  style={{ height: "300px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{funko.nombre}</h5>
                  <p className="card-text text-success fw-bold">
                    ${funko.precio.toLocaleString()}
                  </p>
                  <Link
                    to="/tienda"
                    className="btn btn-warning w-100"
                  >
                    Ir a Tienda
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunkoDestacados;
