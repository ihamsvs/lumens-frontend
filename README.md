# LUMENS | Cinematic Travel Scout 🎥🌍

Lumens es una aplicación de planificación de viajes impulsada por IA que te permite descubrir destinos a través de una lente cinematográfica. Encuentra locaciones de rodaje, los mejores momentos para visitar y configuraciones profesionales de cámara para capturar la foto perfecta.

![LUMENS App Screenshot](./public/globe.svg)

## ✨ Características

- **Búsqueda Inteligente:** Generación de itinerarios turísticos y cinematográficos con Gemini AI.
- **Mapa Interactivo:** Visualización de rutas y puntos de interés con MapLibre y Carto Dark Matter.
- **Datos Técnicos:** Recomendaciones de ISO, apertura y lentes para fotógrafos.
- **Imágenes Reales:** Integración con Unsplash para mostrar locaciones precisas.
- **UI Cinemática:** Interfaz moderna y oscura diseñada con Tailwind CSS v4.

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14 (App Router), React, TypeScript.
- **Estilos:** Tailwind CSS v4, Shadcn/UI, Lucide React.
- **Mapas:** React Map GL, MapLibre GL.
- **Backend (Repo Separado):** NestJS, Gemini API, Unsplash API.

## 🚀 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/lumens-frontend.git](https://github.com/tu-usuario/lumens-frontend.git)
    cd lumens-frontend
    ```

2.  **Instalar dependencias:**
    ```bash
    pnpm install
    # o npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz:
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```

5.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Licencia

Este proyecto está bajo la licencia MIT.
