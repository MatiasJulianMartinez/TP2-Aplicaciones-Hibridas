import { Link } from "react-router-dom";
import bannerFunko from "../../assets/imgs/banner-funko.jpg"; 

// Componente principal del banner hero de la página de inicio
const Hero = () => {
  return (
    <section
      className="bg-dark text-white d-flex align-items-center"
      style={{
        minHeight: "85vh",
        background: "linear-gradient(to right, #1a1a1a, #121212)", 
      }}
    >
      <div className="container py-5">
        <div className="row align-items-center">
          
          {/* Texto izquierdo */}
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-3 fw-bold">
              ¡Descubrí tus{" "}
              <span className="text-warning">Funkos favoritos</span>!
            </h1>
            <p className="lead mt-3">
              Navegá por nuestra colección y encontrá los mejores Funkos Pop originales, réplicas o llaveros. Todo en un solo lugar.
            </p>
            <Link
              to="/tienda"
              className="btn btn-warning btn-lg mt-4 fw-semibold shadow"
            >
              Ver colección
            </Link>
          </div>

          {/* Imagen derecha */}
          <div className="col-lg-6 text-center mt-5 mt-lg-0">
            <img
              src={bannerFunko}
              alt="Banner Funko"
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "420px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
