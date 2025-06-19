import React from "react";
// Componente que muestra una sección destacando las ventajas de comprar en Mundo Funko
const Caracteristicas = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-5 fw-bold">¿Por qué elegir <span className="text-warning">Mundo Funko</span>?</h2>

        <div className="row g-4">
          {/* Característica 1: Variedad */}
          <div className="col-md-4">
            <div className="p-4 bg-white border rounded shadow-sm h-100">
              <i className="bi bi-box-seam fs-1 text-primary mb-3"></i>
              <h4 className="fw-semibold">Variedad Increíble</h4>
              <p className="text-muted">
                Tenemos Funkos originales, réplicas, llaveros y más.
              </p>
            </div>
          </div>

          {/* Característica 2: Exclusividad */}
          <div className="col-md-4">
            <div className="p-4 bg-white border rounded shadow-sm h-100">
              <i className="bi bi-stars fs-1 text-success mb-3"></i>
              <h4 className="fw-semibold">Ediciones Exclusivas</h4>
              <p className="text-muted">
                Encontrá piezas únicas y coleccionables limitadas.
              </p>
            </div>
          </div>

          {/* Característica 3: Pasión */}
          <div className="col-md-4">
            <div className="p-4 bg-white border rounded shadow-sm h-100">
              <i className="bi bi-heart-fill fs-1 text-danger mb-3"></i>
              <h4 className="fw-semibold">Pasión por los Funkos</h4>
              <p className="text-muted">
                Somos fanáticos como vos, y se nota en el servicio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Caracteristicas;
