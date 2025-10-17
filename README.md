# Weather App 🌤️

Este proyecto es una práctica para replicar una aplicación de clima
utilizando **Vite**, **React**, **Axios** y **TailwindCSS**, siguiendo las
especificaciones dadas en la consigna.

------------------------------------------------------------------------

## 🚀 Configuración Inicial

### 1. Crear el proyecto con Vite

``` bash
npm create vite@latest weather-app 
cd weather-app
```

### 2. Instalar dependencias necesarias

``` bash
npm i tailwindcss @tailwindcss/vite 
npm i axios
```

### 3. Configurar TailwindCSS

Agrega las rutas en `src/index.css` incluye:

``` css
@import "tailwindcss";
```

------------------------------------------------------------------------

## 🌍 APIs utilizadas

-   **[OpenWeather API](https://openweathermap.org/api)** → Para obtener
    la información del clima actual y el pronóstico.
-   **[ipinfo.io](https://ipinfo.io/)** → Para obtener la ubicación del
    usuario a partir de su dirección IP.

------------------------------------------------------------------------

## 🧩 Estructura principal del proyecto

    src/
     ├── api/
     │   ├── geolocalisation/
     │   │   ├── client.js
     │   │   ├── config.js
     │   │   └── services.js
     │   ├── local/
     │   └── open-weather/
     ├── components/
     │   ├── DrawerSearchPlaces.jsx
     │   ├── Information.jsx
     │   └── Places.jsx
     ├── helpers/
     │   └── utils/
     ├── hooks/
     │   └── useServices.js
     ├── pages/
     │   └── MainTemperature.jsx
     ├── App.jsx
     └── main.jsx

------------------------------------------------------------------------

## ⚙️ Funcionalidades principales

-   Mostrar el **clima actual** de una ciudad predeterminada o la
    ubicación del usuario.
-   Permitir **buscar por ciudad** y actualizar los datos del clima.
-   Mostrar un **pronóstico de 5 días** agrupando temperaturas mínimas y
    máximas.
-   **Modo oscuro** (opcional) con TailwindCSS.
-   Animaciones al cargar datos y efectos al interactuar.

------------------------------------------------------------------------

## 🎨 Estilos y diseño

-   Implementado completamente con **TailwindCSS**.
-   Diseño **responsivo** y adaptable a dispositivos móviles.
-   Uso de **modo oscuro** (opcional).
-   Tipografía limpia y colores contrastantes.

------------------------------------------------------------------------

## 🧠 Criterios de Evaluación

### ✅ Funcionalidad

-   La aplicación muestra el clima actual correctamente.
-   La búsqueda por ciudad funciona adecuadamente.

### 🎨 Estilo y Responsividad

-   Diseño fiel a la demo proporcionada.
-   Completamente responsiva.

### 💻 Código

-   Estructurado, legible y modular.
-   Uso correcto de React, Hooks y TailwindCSS.



------------------------------------------------------------------------

## 📦 Scripts útiles

``` bash
npm run dev        # Ejecutar en modo desarrollo
npm run build      # Construir la app para producción
npm run preview    # Previsualizar el build
```


------------------------------------------------------------------------

## 🧑‍💻 Autor

**Luis Enrique Palacio Dimas**
