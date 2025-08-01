## 📖 Andrival-Portafolio

Este repositorio contiene tu portafolio construido con Next.js y desplegado en GitHub Pages bajo el subdirectorio `/Andrival-portafolio`.
A continuación encontrarás instrucciones para:

1. Poner en marcha el entorno de desarrollo local.
2. Hacer build y deploy automático con GitHub Actions.
3. Añadir y referenciar imágenes de manera que carguen correctamente en GitHub Pages.

---

## 🚀 Empezando localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/Danval-003/Andrival-portafolio.git
cd Andrival-portafolio
```

### 2. Instalar dependencias

Usando Yarn:

```bash
yarn install
```

### 3. Variables de entorno

Para desarrollo local no necesitas variables especiales, ya que `NEXT_PUBLIC_BASE_PATH` se calcula en tiempo de build. Si quieres forzar otro subdirectorio, puedes crear un archivo `.env.local`:

```env
NEXT_PUBLIC_BASE_PATH=
```

### 4. Arrancar el servidor de desarrollo

```bash
yarn dev
```

Abre luego [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🛠️ Scripts disponibles

En tu `package.json` encontrarás estos scripts:

* **`yarn lint`**
  Ejecuta ESLint para comprobar tu código.
* **`yarn build`**
  Compila y exporta el sitio estático en `out/` (ya incluye `output: 'export'`).
* **`yarn deploy`**
  Publica el contenido de `out/` en la rama de GitHub Pages (`gh-pages` o la que hayas configurado) usando `peaceiris/actions-gh-pages`.

---

## ⚙️ Despliegue con GitHub Actions

El workflow definido en `.github/workflows/deploy.yml` se activa al hacer push en `main`.
Realiza estos pasos:

1. **Install**: `yarn install --frozen-lockfile`
2. **Lint**: `yarn lint`
3. **Build**: `yarn build` (genera `out/`)
4. **Deploy**: sube `out/` a la rama `gh-pages` (o la rama que hayas elegido)

No necesitas añadir manualmente `GITHUB_TOKEN`; GitHub Actions lo inyecta automáticamente.

---

## 🖼️ Cómo añadir imágenes

Para que las imágenes en `public/` se vean correctamente bajo el subdirectorio `/Andrival-portafolio`, debes anteponer el prefijo `basePath` a tus rutas. El flujo es:

1. **En `next.config.js`** se define:

   ```js
   const isCI = process.env.GITHUB_ACTIONS === "true";
   const basePath = isCI ? "/Andrival-portafolio" : "";

   module.exports = {
     output: "export",
     basePath,
     assetPrefix: basePath,
     images: { unoptimized: true },
     env: {
       NEXT_PUBLIC_BASE_PATH: basePath
     }
   };
   ```

2. **En tus componentes**, usa la variable `process.env.NEXT_PUBLIC_BASE_PATH`:

   * Con `<Image>` de Next.js:

     ```jsx
     import Image from "next/image";

     export default function Hero() {
       const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
       return (
         <Image
           src={`${prefix}/assets/common/placeholder.png`}
           alt="Placeholder"
           width={400}
           height={300}
           unoptimized
         />
       );
     }
     ```

   * Con la etiqueta `<img>` nativa:

     ```jsx
     const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

     <img
       src={`${prefix}/assets/common/placeholder.png`}
       alt="Placeholder"
     />
     ```

3. **Ubicación de la imagen**:
   Coloca tus archivos bajo `public/assets/...`. GitHub Pages los servirá en:

   ```
   https://Danval-003.github.io/Andrival-portafolio/assets/...
   ```

   siempre que uses el prefijo correcto.

---

## ✔️ Checklist para colaboradores

* [ ] Clonar y ejecutar `yarn install && yarn dev` para validar cambios.
* [ ] Ejecutar `yarn lint` antes de hacer commit.
* [ ] Referenciar siempre las imágenes con `process.env.NEXT_PUBLIC_BASE_PATH` como prefijo.
* [ ] Hacer push a `main` para que el workflow despliegue automáticamente el sitio.

