import React from "react";

// Lista de eventos de Mundo Funko
const eventos = [
  {
    titulo: "Expo Coleccionistas 2025",
    lugar: "La Rural, Palermo",
    fecha: "20 y 21 de julio",
    descripcion: "Venta y exhibición de figuras Funko",
    imagen: "https://cdn-az.allevents.in/events2/banners/1482a5dda85d7c37eae5b8ed1fb89d54cd221d91a4d6ecfaf44a74d63c2cf225-rimg-w1200-h446-dc13192f-gmir?v=1745644047", // ejemplo ilustrativo
  },
  {
    titulo: "Comic-Con Argentina",
    lugar: "Costa Salguero",
    fecha: "6 al 8 de septiembre",
    descripcion: "Stands exclusivos de Funko Pop",
    imagen: "https://turismo.buenosaires.gob.ar/sites/turismo/files/field/image/comic-con-arg-1500x610_0.png", 
  },
  {
    titulo: "Feria Friki Fest",
    lugar: "Centro Cultural Borges",
    fecha: "12 de octubre",
    descripcion: "Actividades, sorteos y venta de Funkos",
    imagen: "https://i.ytimg.com/vi/fhe-Nj8ZvJU/maxresdefault.jpg", 
  },
];

// Componente muestra los eventos por realizarse
const Eventos = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">🎉 Próximos Eventos Funko en Buenos Aires</h2>
        <div className="row g-4">
          {eventos.map((evento, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={evento.imagen}
                  className="card-img-top"
                  alt={evento.titulo}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{evento.titulo}</h5>
                  <p className="card-text">
                    📍 <strong>{evento.lugar}</strong><br />
                    📅 <strong>{evento.fecha}</strong><br />
                    📝 {evento.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Eventos;
