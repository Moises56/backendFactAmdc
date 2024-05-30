import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs"; // Asegúrate de tener esta importación si aún no la tienes
import { promisify } from "util";
import { connect } from "../../db.js"; // Ajusta la ruta a tu configuración de la base de datos
import { generatePasswordResetToken } from "../../utils/authUtils.js";

const Email = {};

// Configurar el transporte de nodemailer
Email.transporter = nodemailer.createTransport({
  host: "us2.smtp.mailhostbox.com",
  port: 587,
  secure: false,
  auth: {
    user: "moises.aviles@amdc.hn",
    pass: "Gtales1991",
  },
  requireTLS: true,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

Email.transporter.verify().then(() => {
  console.log("ready for send email");
});

// Controlador para solicitar la recuperación de contraseña
Email.forgotPassword = async (req, res) => {
  const { correo } = req.body;
  const db = await connect();

  try {
    // Verificar si el usuario existe
    const [user] = await db.query("SELECT * FROM usuarios WHERE correo = ?", [
      correo,
    ]);

    if (user.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const userFound = user[0];

    // Generar un token de recuperación
    const resetToken = generatePasswordResetToken(userFound.id);

    // Establecer la expiración del token (1 hora)
    const resetTokenExpires = Date.now() + 3600000; // 1 hora

    // Guardar el token y su expiración en la base de datos
    await db.query(
      "UPDATE usuarios SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE correo = ?",
      [resetToken, resetTokenExpires, correo]
    );

    // Enviar el correo electrónico con el enlace de recuperación
    const resetURL = `http://localhost:3001/email/resetPassword/${resetToken}`;
    const message = `
    <html>
      <head>
        <style>
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            text-align: center; /* Para centrar el contenido */
          }
          .logo {
            width: 150px;
            height: auto;
            margin-bottom: 20px;
            display: block; /* Para que la imagen se centre correctamente */
            margin-left: auto; /* Centrar horizontalmente */
            margin-right: auto; /* Centrar horizontalmente */
          }
          .button {
            display: inline-block;
            background-color: #5ccedf;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://amdc.hn/wp-content/uploads/2023/09/AMDC-LOGO.png" alt="AMDC" class="logo">
          <p>Recibió este correo electrónico porque usted solicitó restablecer la contraseña para su cuenta.</p>
          <p>Haga clic en el siguiente botón para completar el proceso:</p>
          <a href="${resetURL}" class="button">Restablecer Contraseña</a>
          <br>
          <p>Si no solicitó esto, ignore este correo electrónico y su contraseña permanecerá sin cambios.</p>
          <p>CIUDAD DEL BUEN CORAZÓN</p>
          <p>AMDC</p>
        </div>
      </body>
    </html>
  `;

    await Email.transporter.sendMail({
      to: correo,
      from: "moises.aviles@amdc.hn",
      subject: "Recuperación de contraseña",
      html: message,
    });

    res.json({ message: "Correo de recuperación enviado", status: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para restablecer la contraseña
Email.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  console.log(token);
  console.log(newPassword);
  const db = await connect();

  try {
    // Buscar al usuario con el token y verificar que no haya expirado
    const [userResult] = await db.query(
      "SELECT * FROM usuarios WHERE resetPasswordToken = ? AND resetPasswordExpires > ?",
      [token, Date.now()]
    );

    if (userResult.length === 0) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const user = userResult[0];

    // Actualizar la contraseña del usuario
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Ajusta el número de rondas según tu configuración
    await db.query(
      "UPDATE usuarios SET contrasena = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );

    res.json({ message: "Contraseña restablecida", status: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default Email;
