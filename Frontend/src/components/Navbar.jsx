import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          Mundo Funko
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor colapsable */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Izquierda: Links navegación */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-column flex-lg-row align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tienda">
                Tienda
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ayuda">
                Ayuda
              </Link>
            </li>
          </ul>

          {/* Derecha: botones usuario/login */}
          <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
            {usuario ? (
              <>
                {usuario.role === 'admin' && (
                  <Link to="/admin" className="btn btn-outline-secondary btn-md">
                    Panel
                  </Link>
                )}

                <Link to="/perfil" className="btn btn-outline-success btn-md">
                  Mi Perfil
                </Link>

                <button onClick={handleLogout} className="btn btn-outline-danger btn-md">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/ingresar" className="btn btn-outline-primary btn-md">
                  Ingresar
                </Link>
                <Link to="/registrarse" className="btn btn-outline-success btn-md">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
