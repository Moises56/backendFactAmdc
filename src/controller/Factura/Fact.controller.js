const Factu = {};

import e from "cors";
import { connect } from "../../db.js";

// Obtener todas las facturas
// Factu.getAllfacturasMercado = async (req, res) => {
//   const conn = await connect();
//   try {
//     const [rows] = await conn.query("SELECT * FROM facturasMercado");
//     res.json({
//       data: rows,
//       message: "all Facturas",
//       status: "ok",
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Obtener todas las facturas
Factu.getAllfacturasMercado = async (req, res) => {
  const conn = await connect();
  try {
    const [rows] = await conn.query("SELECT * FROM facturasMercado");
    res.json({
      data: rows,
      message: "all Facturas",
      status: "ok",
    });
  } catch (error) {
    // Verificar si el error es de tipo SyntaxError (ocurre al intentar analizar una respuesta no JSON)
    if (error instanceof SyntaxError) {
      res.status(500).json({ message: "Error inesperado en el servidor" });
    } else {
      // Si no es un error de sintaxis, devolver el mensaje de error original
      res.status(400).json({ message: error.message });
    }
  }
};

// Crear factura
Factu.createFactura = async (req, res) => {
  const conn = await connect();
  try {
    const {
      mercado,
      propietario,
      fechaFactura,
      numero_local,
      concepto,
      mes,
      monto,
      usuario,
      DNI,
      permiso_operacion,
    } = req.body;
    const [result] = await conn.query(
      "INSERT INTO facturasMercado (mercado, propietario, fechaFactura, numero_local, concepto, mes, monto, usuario, DNI, permiso_operacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        mercado,
        propietario,
        fechaFactura,
        numero_local,
        concepto,
        mes,
        monto,
        usuario,
        DNI,
        permiso_operacion,
      ]
    );
    res.json({
      data: { id: result.insertId, ...req.body },
      status: "ok",
      message: "Factura guardada con éxito",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default Factu;
