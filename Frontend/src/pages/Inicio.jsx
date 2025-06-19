import Hero from "../components/inicio/Hero";
import Caracteristicas from "../components/inicio/Caracteristicas";
import FunkoDestacados from "../components/inicio/FunkoDestacados";
import Eventos from "../components/inicio/Eventos";
import PieDePagina from "../components/inicio/PieDePagina";
import CategoriasDestacadas from "../components/inicio/CategoriasDestacadas";

// Vista principal donde se agrupa las secciones de Mundo Funko
const Inicio = () => {
  return (
    <div>
      <Hero />
      <Caracteristicas />
      <FunkoDestacados />
      <CategoriasDestacadas />
      <Eventos />
      <PieDePagina />
    </div>
  );
};

export default Inicio;

