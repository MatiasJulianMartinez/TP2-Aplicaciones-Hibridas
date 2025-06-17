import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PanelAdmin from "./pages/PanelAdmin";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import RutaPrivada from "./components/RutaPrivada";
import Tienda from "./pages/Tienda";
import ProductoDetalle from "./pages/ProductoDetalle";
import Perfil from "./pages/Perfil";
import Ayuda from "./pages/Ayuda";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/ingresar" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/ayuda" element={<Ayuda />} />
          
          <Route
            path="/perfil"
            element={
              <RutaPrivada>
                <Perfil />
              </RutaPrivada>
            }
          />

          <Route
            path="/admin"
            element={
              <RutaPrivada>
                <PanelAdmin />
              </RutaPrivada>
            }
          />

          <Route
            path="/tienda"
            element={
              <RutaPrivada>
                <Tienda />
              </RutaPrivada>
            }
          />

          <Route
            path="/producto/:id"
            element={
              <RutaPrivada>
                <ProductoDetalle />
              </RutaPrivada>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
