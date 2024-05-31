const Factu = {};

import e from "cors";
import { connect } from "../../db.js";

// Obtener todas las facturas
Factu.getAllfacturasMercado = async (req, res) => {
  const conn = await connect();
  try {
    const [rows] = await conn.query("SELECT * FROM facturasMercado");
    //ordenar por orden de creacion el ultimo primero
    rows.sort((a, b) => b.id - a.id);
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
// Función para convertir fecha DD/MM/YYYY a YYYY-MM-DD
function formatDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

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

    // Verificar y formatear la fechaFactura a YYYY-MM-DD
    let formattedDate;
    try {
      formattedDate = formatDate(fechaFactura);
      const date = new Date(formattedDate);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const [result] = await conn.query(
      "INSERT INTO facturasMercado (mercado, propietario, fechaFactura, numero_local, concepto, mes, monto, usuario, DNI, permiso_operacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        mercado,
        propietario,
        formattedDate,
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
      data: { id: result.insertId, ...req.body, fechaFactura: formattedDate },
      status: "ok",
      message: "Factura guardada con éxito",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default Factu;
