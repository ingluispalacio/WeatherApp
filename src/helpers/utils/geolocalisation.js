
export const getUserCoordinates = () =>{
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("La geolocalización no es soportada por este navegador."));
      return;
    }

    // Solicita la posición actual del usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Permiso denegado para acceder a la ubicación."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("La información de ubicación no está disponible."));
            break;
          case error.TIMEOUT:
            reject(new Error("La solicitud para obtener la ubicación expiró."));
            break;
          default:
            reject(new Error("Ocurrió un error desconocido al obtener la ubicación."));
        }
      }
    );
  });
}

