<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React logo" />
</p>

<h1 align="center">Pokémon App</h1>
<p align="center">Una aplicación web para explorar Pokémon usando la PokéAPI, construida con React, Vite y Zustand.</p>

---

## 🚀 Demo en producción

👉 [Ver la aplicación en GitHub Pages](https://jesusdavid31.github.io/pokemon-app/#/home-page)

---

## 🧩 Tecnologías utilizadas

- ⚛️ [React](https://reactjs.org/)
- ⚡ [Vite](https://vitejs.dev/)
- 🛠️ [TypeScript](https://www.typescriptlang.org/)
- 🐱 [Zustand](https://zustand-demo.pmnd.rs/)
- 🌐 [PokéAPI](https://pokeapi.co/)
- 📦 [pnpm](https://pnpm.io/)

---

## 🛠️ Instalación y ejecución local

Asegúrate de tener instalado [pnpm](https://pnpm.io/):

```bash
npm install -g pnpm
```

Luego clona el repositorio y ejecuta:

```bash
pnpm install
pnpm dev
```

La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## 📦 Scripts disponibles

```bash
pnpm dev         # Ejecuta el servidor de desarrollo
pnpm build       # Compila el proyecto para producción (TypeScript + Vite)
pnpm preview     # Sirve la app ya compilada
pnpm lint        # Ejecuta el linter
pnpm gh-deploy   # Compila y publica en GitHub Pages
```

---

## 🌍 Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse en la rama `gh-pages`.  
Para hacerlo, simplemente ejecuta:

```bash
pnpm gh-deploy
```

> Se utiliza `HashRouter` para garantizar la compatibilidad con GitHub Pages y evitar errores 404 en rutas dinámicas.

---

## 📁 Estructura del proyecto (simplificada)

```
src/
├── assets/              # Imágenes y recursos estáticos
├── components/          # Componentes reutilizables
├── layouts/             # Layouts de rutas. Ej: BlankLayout usa <Outlet /> para representar rutas hijas
├── pages/               # Páginas principales (Home, Detalle, etc.)
├── routes/              # Definición de rutas
├── store/              # Estado global con Zustand
└── main.tsx             # Punto de entrada principal
```

---

## 📄 Licencia

Este proyecto está licenciado bajo la licencia MIT.

> ⚠️ Este repositorio es de solo lectura. No se aceptan contribuciones externas ni pull requests.