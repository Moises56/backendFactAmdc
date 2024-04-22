const Market = {};

import { connect } from "../../db.js";

//* localidades ==========>

// Get all localidades
Market.getAllLocalidades = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM localidades");
  res.json(rows);
};

// Get localidades by id
Market.getLocalidadesById = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM localidades WHERE id = ?", [
    req.params.id,
  ]);
  res.json(rows[0]);
};

// create localidades, propietario,DNI,numero_local,nombre_local,tipo_local,estado_local,latitud,longitud,telefono,direccion,monto usando try catch

Market.createLocalidades = async (req, res) => {
  const conn = await connect();
  try {
    const [result] = await conn.query(
      "INSERT INTO localidades (propietario,DNI,numero_local,nombre_local,tipo_local,estado_local,latitud,longitud,telefono,direccion,monto,mercado_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.propietario,
        req.body.DNI,
        req.body.numero_local,
        req.body.nombre_local,
        req.body.tipo_local,
        req.body.estado_local,
        req.body.latitud,
        req.body.longitud,
        req.body.telefono,
        req.body.direccion,
        req.body.monto,
        req.body.mercado_id,
      ]
    );
    res.json({
      id: result.insertId,
      ...req.body,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update localidades, propietario,DNI,numero_local,nombre_local,tipo_local,estado_local,latitud,longitud,telefono,direccion,monto usando try catch

Market.updateLocalidades = async (req, res) => {
  const conn = await connect();
  try {
    await conn.query(
      "UPDATE localidades SET propietario = ?, DNI = ?, numero_local = ?, nombre_local = ?, tipo_local = ?, estado_local = ?, latitud = ?, longitud = ?, telefono = ?, direccion = ?, monto = ?, mercado_id = ? WHERE id = ?",
      [
        req.body.propietario,
        req.body.DNI,
        req.body.numero_local,
        req.body.nombre_local,
        req.body.tipo_local,
        req.body.estado_local,
        req.body.latitud,
        req.body.longitud,
        req.body.telefono,
        req.body.direccion,
        req.body.monto,
        req.body.mercado_id,
        req.params.id,
      ]
    );
    res.json({
      id: parseInt(req.params.id),
      ...req.body,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete localidades by id  --> primero se debe eliminar los mercados que esten relacionados con la localidad
Market.deleteLocalidades = async (req, res) => {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM mercados WHERE localidad_id = ?", [
      req.params.id,
    ]);
    await conn.query("DELETE FROM localidades WHERE id = ?", [req.params.id]);
    res.json({ message: "localidad deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//* Mercados ==========>

// Get all markets
Market.getAllMarkets = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM mercados");
  res.json(rows);
};

// Get market by id
Market.getMarketById = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM mercados WHERE id = ?", [
    req.params.id,
  ]);
  res.json(rows[0]);
};

// create market, nombre_mercado,direccion,latitud,longitud,usando la relacion de localidad_id, con try catch
Market.createMarket = async (req, res) => {
  const conn = await connect();
  try {
    const [result] = await conn.query(
      "INSERT INTO mercados (nombre_mercado,direccion,latitud,longitud,localidad_id) VALUES (?, ?, ?, ?, ?)",
      [
        req.body.nombre_mercado,
        req.body.direccion,
        req.body.latitud,
        req.body.longitud,
        req.body.localidad_id,
      ]
    );
    res.json({
      id: result.insertId,
      ...req.body,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update market, nombre_mercado,direccion,latitud,longitud,usando la relacion de localidad_id, con try catch
Market.updateMarket = async (req, res) => {
  const conn = await connect();
  try {
    await conn.query(
      "UPDATE mercados SET nombre_mercado = ?, direccion = ?, latitud = ?, longitud = ?, localidad_id = ? WHERE id = ?",
      [
        req.body.nombre_mercado,
        req.body.direccion,
        req.body.latitud,
        req.body.longitud,
        req.body.localidad_id,
        req.params.id,
      ]
    );
    res.json({
      id: parseInt(req.params.id),
      ...req.body,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete market by id
Market.deleteMarket = async (req, res) => {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM mercados WHERE id = ?", [req.params.id]);
    res.json({ message: "market deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// consulta para mostrar todos los locales de cada mercado
Market.getAllLocalidadesAndMarkets = async (req, res) => {
  const conn = await connect();
  const [rows] = await conn.query(
    `
      SELECT M.nombre_mercado, 
          L.propietario,
          L.DNI,
          L.nombre_local, 
          L.tipo_local, 
          L.estado_local, 
          L.telefono, 
          L.direccion,
          L.monto
      FROM mercados M
      JOIN localidades L
      ON M.id = L.mercado_id
      ORDER BY M.nombre_mercado, L.nombre_local;
    `
  );
  res.json(rows);
};

// get a markets by id whith localidades
Market.getAllLocalidadesByMarketId = async (req, res) => {
  const conn = await connect();
  try {
    // si el id no existe, mostrar un mensaje de no hay datos con ese id
    const [rows] = await conn.query(
      `
      SELECT M.nombre_mercado, 
          L.propietario,
          L.DNI,
          L.nombre_local, 
          L.tipo_local, 
          L.estado_local, 
          L.telefono, 
          L.direccion,
          L.monto
      FROM mercados M
      JOIN localidades L
      ON M.id = L.mercado_id
      WHERE M.id = ?
      ORDER BY L.nombre_local;
    `,
      [req.params.id]
    );
    if (rows.length === 0) {
      res.json({ message: "El mercado no existe" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default Market;
