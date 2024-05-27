const Auth = {};
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { promisify } from "util";

import { connect } from "../../db.js";
import { stat } from "fs";

//* registrar user con jwt y bcrypt usando try catch y promisify bcrypt hash y compare para encriptar en la base de datos los campos son: nombre , apellido,  dni, correo, contrasena, telefono, rol_id
Auth.register = async (req, res) => {
  const {
    nombre,
    apellido,
    dni,
    correo,
    contrasena,
    telefono,
    numero_empleado,
    rol_id,
  } = req.body;
  const db = await connect();
  // console.log(req.body);
  try {
    const user = await db.query("SELECT * FROM usuarios WHERE correo = ?", [
      correo,
    ]);
    const userFound = user[0];
    if (userFound.length > 0) {
      return res.json({
        message: `Usuario con correo: ${correo}, ya existe`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await promisify(bcrypt.hash)(contrasena, salt);

    await db.query(
      "INSERT INTO usuarios (nombre, apellido, dni, correo, contrasena, telefono, numero_empleado, rol_id) VALUES (?,?,?,?,?,?,?,2)",
      [
        nombre,
        apellido,
        dni,
        correo,
        hashedPassword,
        telefono,
        numero_empleado,
        rol_id,
      ]
    );

    res.json({
      message: `Usuario: ${nombre} ${apellido} fue registrado con exito!`,
      status: "ok",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* login user con jwt y bcrypt usando try catch y promisify bcrypt hash y compare para encriptar en la base de datos los campos son: correo, contrasena
Auth.login = async (req, res) => {
  const { correo, contrasena } = req.body;
  const db = await connect();
  try {
    const user = await db.query("SELECT * FROM usuarios WHERE correo = ?", [
      correo,
    ]);

    //* obtener el rol del usuario
    const rol = await db.query("SELECT * FROM roles WHERE id = ?", [
      user[0][0].rol_id,
    ]);
    const rolFound = rol[0][0].nombre;
    console.log("Rol:", rolFound);

    if (user.length > 0) {
      const userFound = user[0];
      console.log("Usuario Encontrado:", userFound[0]);
      console.log("Contraseña Almacenada:", userFound[0].contrasena);
      const validPassword = await promisify(bcrypt.compare)(
        contrasena,
        userFound[0].contrasena
      );
      console.log("Valid Password:", validPassword);

      if (validPassword) {
        const token = jwt.sign({ id: userFound[0].id }, "secretkey", {
          expiresIn: "1h",
        }); // Cambia 'secretkey' por tu propia clave secreta y ajusta el tiempo de expiración según tus necesidades
        res.json({
          status: "ok",
          data: token,
          user: userFound[0].nombre + " " + userFound[0].apellido,
          message: "Usuario autenticado",
          rol: rolFound,
        });
      } else {
        res.status(401).json({ message: "Contraseña incorrecta" }); // Cambio de estado a 401 Unauthorized para contraseñas incorrectas
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" }); // Cambio de estado a 404 Not Found para usuarios no encontrados
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Cambio de estado a 500 Internal Server Error para errores internos del servidor
  }
};

//* obtener todos los usuarios
Auth.getAllUsers = async (req, res) => {
  const db = await connect();
  const users = await db.query("SELECT * FROM usuarios");
  res.json(users[0]);
};

//* obtener usuario por id
Auth.getUserById = async (req, res) => {
  const db = await connect();
  const { id } = req.params;
  const user = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  res.json(user[0]);
};

// actualizar usuario por id
Auth.updateUser = async (req, res) => {
  const db = await connect();
  const { id } = req.params;
  const {
    nombre,
    apellido,
    dni,
    correo,
    contrasena,
    telefono,
    numero_empleado,
    rol_id,
  } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await promisify(bcrypt.hash)(contrasena, salt);
  await db.query(
    "UPDATE usuarios SET nombre = ?, apellido = ?, dni = ?, correo = ?, contrasena = ?, telefono = ?, numero_empleado = ?, rol_id = ? WHERE id = ?",
    [
      nombre,
      apellido,
      dni,
      correo,
      hashedPassword,
      telefono,
      numero_empleado,
      rol_id,
      id,
    ]
  );
  res.json({ message: "Usuario actualizado" });
};

// eliminar usuario por id
Auth.deleteUser = async (req, res) => {
  const db = await connect();
  const { id } = req.params;
  // que sea un truncate para eliminar todo el registro
  await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
  res.json({ message: "Usuario eliminado" });
};

// obtener usuario por by token
Auth.getUserByToken = async (req, res) => {
  const token = req.headers["x-access-token"];
  console.log("Token:", token);
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }
  const decoded = jwt.verify(token, "secretkey");
  const db = await connect();
  const user = await db.query("SELECT * FROM usuarios WHERE id = ?", [
    decoded.id,
  ]);
  res.json({
    status: "ok",
    data: user[0],
  });
};

export default Auth;
