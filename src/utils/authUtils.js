import jwt from "jsonwebtoken";

// Función para generar un token de restablecimiento de contraseña
export const generatePasswordResetToken = (userId) => {
  // Define el payload del token con el id del usuario y un tiempo de expiración
  const payload = {
    userId: userId,
    // Puedes ajustar la duración del token según tus necesidades
    // En este ejemplo, el token expirará en 1 hora (3600 segundos)
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  // Genera el token JWT utilizando una clave secreta
  // Asegúrate de reemplazar 'secretkey' con tu propia clave secreta
  const token = jwt.sign(payload, "secretkey");

  return token;
};
