import React from "react";

// Componente de pie de página (footer) con derechos de autor y enlaces a redes sociales
const PieDePagina = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">&copy; {new Date().getFullYear()} Mundo Funko. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <small className="d-block mb-2">Seguinos en nuestras redes sociales</small>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3 fs-5">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3 fs-5">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PieDePagina;
