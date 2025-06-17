# 🌟 Mundo Funko

## Tecnologías Utilizadas

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,javascript,vscode,postman" />
</p>

- React  
- Node.js + Express.js  
- MongoDB  
- JWT  
- JavaScript  
- Postman  
- VSCode  

---

Este proyecto fue desarrollado para la materia **Aplicaciones Híbridas** de la Tecnicatura en Diseño y Programación Web en la Escuela Da Vinci.

Consiste en una aplicación web enfocada en el universo de los **Funko Pop**, permitiendo explorar distintos personajes, categorías y gestionar productos desde un panel de administración.

## 🧩 Modelos

- **Funko** → nombre, descripción, imagen, precio, categoría.  
- **Categoría** → nombre, descripción, origen, material, tags.  
- **Usuario** → nombre, email, contraseña (encriptada), rol y fecha de creación.  

---

## ✅ Requerimientos cumplidos

### Backend

| Requisito                                 | Estado | Detalle                                      |
|------------------------------------------|--------|----------------------------------------------|
| API REST separada del frontend           | ✅     | API con Node, Express y MongoDB Atlas        |
| Autenticación JWT                        | ✅     | Autenticación protegida por tokens           |
| Base de Datos                            | ✅     | MongoDB Atlas en la nube                     |
| Gestión de usuarios                      | ✅     | Registro, login, y validación de rol         |
| Al menos dos entidades además de usuario | ✅     | Funko y Categoría                            |
| CRUD completo                            | ✅     | Operaciones CRUD para todas las entidades    |

### Frontend

| Requisito                                 | Estado | Detalle                                         |
|------------------------------------------|--------|-------------------------------------------------|
| Componentes funcionales con Hooks        | ✅     | Uso de `useState`, `useEffect`, `useContext`   |
| División de componentes                  | ✅     | Cards, Navbar, Vistas, Formularios             |
| Enrutamiento con React Router            | ✅     | Navegación con `react-router-dom`              |
| Separación de vistas y lógica API        | ✅     | `services/` para llamadas a la API             |
| Manejo correcto del estado               | ✅     | Estado distribuido por componente              |

---

## 🚀 ¿Cómo ejecutar el proyecto?

```bash
1. Clonar el repositorio
git clone https://github.com/tuusuario/mundo-funko
cd mundo-funko

2. Configurar variables de entorno en el backend
# En la carpeta BackEnd, crear un archivo .env
# Basado en .env.template. Debés incluir:
# - URL de MongoDB Atlas
# - SECRET_KEY para JWT

3. Instalar dependencias y levantar el backend
cd BackEnd
npm install
npm run dev

4. Abrir nueva terminal, instalar y levantar frontend
cd FrontEnd
npm install
npm run dev

5. Probar la aplicación
# Entrá al link que aparece en consola (usualmente http://localhost:5173)
