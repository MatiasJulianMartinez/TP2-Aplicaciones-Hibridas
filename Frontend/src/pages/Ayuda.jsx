import { Link } from "react-router-dom";

const Ayuda = () => {
  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <h2 className="text-center fw-bold mb-4">Centro de Ayuda - Mundo Funko</h2>

      <div className="accordion" id="ayudaAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading1">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse1"
              aria-expanded="true"
              aria-controls="collapse1"
            >
              🛒 ¿Cómo comprar un Funko?
            </button>
          </h2>
          <div
            id="collapse1"
            className="accordion-collapse collapse show"
            aria-labelledby="heading1"
            data-bs-parent="#ayudaAccordion"
          >
            <div className="accordion-body">
              Para explorar nuestra colección, andá a la <Link to="/tienda">Tienda</Link>. Ahí vas a
              poder ver todos los productos disponibles. Hacé clic en “Ver más” para leer detalles y, si te interesa, podés agregarlo a tu carrito.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="heading2">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse2"
              aria-expanded="false"
              aria-controls="collapse2"
            >
              👤 ¿Cómo me registro?
            </button>
          </h2>
          <div
            id="collapse2"
            className="accordion-collapse collapse"
            aria-labelledby="heading2"
            data-bs-parent="#ayudaAccordion"
          >
            <div className="accordion-body">
              Hacé clic en el botón “Registrarse” arriba a la derecha. Completá tus datos y listo, ya
              vas a poder iniciar sesión como cliente.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="heading3">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse3"
              aria-expanded="false"
              aria-controls="collapse3"
            >
              🌐 ¿Qué tipo de productos hay?
            </button>
          </h2>
          <div
            id="collapse3"
            className="accordion-collapse collapse"
            aria-labelledby="heading3"
            data-bs-parent="#ayudaAccordion"
          >
            <div className="accordion-body">
              En Mundo Funko podés encontrar productos de tipo: <strong>Original</strong>, <strong>Réplica</strong> y <strong>Llavero</strong>. Todos están
              etiquetados claramente para que sepas qué estás viendo.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="heading4">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse4"
              aria-expanded="false"
              aria-controls="collapse4"
            >
              ❓ ¿Tenés otra duda?
            </button>
          </h2>
          <div
            id="collapse4"
            className="accordion-collapse collapse"
            aria-labelledby="heading4"
            data-bs-parent="#ayudaAccordion"
          >
            <div className="accordion-body">
              Podés contactarnos a través de nuestras redes o por correo. Si tenés una duda específica, también podés consultarla desde tu perfil.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ayuda;
