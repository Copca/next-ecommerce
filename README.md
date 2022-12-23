# Pasos Iniciales para crear un Proyecto con Next.js, TypeScript, Taildwind

-   Crear el proyecto

```
npx create-next-app@latest --typescript
```

-   Instalar Taildwind

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

-   Agregar el content en `taildwind.config`

```
 content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
```

-   Agregar las directivas de Taildwins `public/styles/globals.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
