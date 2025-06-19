import { useState } from "react";
import FunkoAdmin from "../components/admin/FunkoAdmin";
import CategoriaAdmin from "../components/admin/CategoriaAdmin"; 
import UsuarioAdmin from "../components/admin/UsuarioAdmin";

// Vista del panel de administración que permite alternar entre los formularios CRUD
const PanelAdmin = () => {
  const [vista, setVista] = useState("funkos"); // Estado para saber qué sección se está visualizando

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Panel de Administración</h1>

      {/* Botones para cambiar entre las vistas: Funkos, Categorías o Usuarios */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className={`btn ${vista === "funkos" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setVista("funkos")}
        >
          Funko Pop
        </button>
        <button
          className={`btn ${vista === "categorias" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setVista("categorias")}
        >
          Categoría Funko Pop
        </button>
        <button
          className={`btn ${vista === "usuarios" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setVista("usuarios")}
        >
          Usuarios
        </button>
      </div>

      {/* Renderiza el componente correspondiente según la vista seleccionada */}
      {vista === "funkos" && <FunkoAdmin />}
      {vista === "categorias" && <CategoriaAdmin />}
      {vista === "usuarios" && <UsuarioAdmin />}
    </div>
  );
};

export default PanelAdmin;
