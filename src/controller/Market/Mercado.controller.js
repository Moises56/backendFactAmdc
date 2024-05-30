const Market = {};

import { connect } from "../../db.js";

//* localidades ==========>

// Get all localidades
Market.getAllLocalidades = async (req, res) => {
  const conn = await connect();
  try {
    const [rows] = await conn.query("SELECT * FROM localidades");
    res.json({
      data: rows,
      message: "all Localidades",
      status: "ok",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
      "INSERT INTO localidades (propietario,DNI,numero_local,nombre_local,tipo_local,estado_local,latitud,longitud,telefono,direccion,monto,fecha_creacion,fecha_modificacion,permiso_operacion,mercado_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(),NOW(), ?)",
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
        req.body.permiso_operacion,
        req.body.mercado_id,
      ]
    );
    res.json({
      data: { id: result.insertId, ...req.body },
      status: "ok",
      message: `${req.body.numero_local}, agregado con exito`,
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
      "UPDATE localidades SET propietario = ?, DNI = ?, numero_local = ?, nombre_local = ?, tipo_local = ?, estado_local = ?, latitud = ?, longitud = ?, telefono = ?, direccion = ?, monto = ?, permiso_operacion=?, mercado_id = ? WHERE id = ?",
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
        req.body.permiso_operacion,
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
  try {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM mercados");
    res.json({
      data: rows,
      message: "all markets",
      status: "ok",
    });
    //ordenar por fecha de creacion
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get market by id
Market.getMarketById = async (req, res) => {
  try {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM mercados WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create market, nombre_mercado,direccion,latitud,longitud,usando la relacion de localidad_id, con try catch
Market.createMarket = async (req, res) => {
  const conn = await connect();
  try {
    // insertar en la tabla mercados los datos del mercado con fecha de creacion y hora automatica
    const [result] = await conn.query(
      "INSERT INTO mercados (nombre_mercado, direccion, latitud, longitud, fecha_creacion, fecha_modificacion) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [
        req.body.nombre_mercado,
        req.body.direccion,
        req.body.latitud,
        req.body.longitud,
      ]
    );
    console.log("Market added: ", req.body.nombre_mercado);
    res.json({
      data: { id: result.insertId, ...req.body },
      status: "ok",
      message: `${req.body.nombre_mercado}, agregado con exito`,
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
      "UPDATE mercados SET nombre_mercado = ?, direccion = ?, latitud = ?, longitud = ?, fecha_modificacion = NOW() WHERE id = ?",
      [
        req.body.nombre_mercado,
        req.body.direccion,
        req.body.latitud,
        req.body.longitud,
        req.params.id,
      ]
    );
    res.json({
      data: { id: parseInt(req.params.id), ...req.body },
      status: "ok",
      message: `${req.body.nombre_mercado}, Mercado actualizado con exito`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete market by id
Market.deleteMarket = async (req, res) => {
  const conn = await connect();
  const nombre_mercado = await conn.query(
    "SELECT nombre_mercado FROM mercados WHERE id = ?",
    [req.params.id]
  );
  const MarketName = nombre_mercado[0][0].nombre_mercado;
  try {
    await conn.query("DELETE FROM mercados WHERE id = ?", [req.params.id]);
    console.log("Market deleted: ", MarketName, "con id: ", req.params.id);
    res.json({
      message: `${MarketName}, eliminado con exito`,
      status: "ok",
      data: req.params.id,
    });
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
      SELECT L.id, M.nombre_mercado, 
          L.propietario,
          L.DNI,
          L.numero_local,
          L.nombre_local, 
          L.tipo_local, 
          L.estado_local, 
          L.telefono, 
          L.direccion,
          L.monto,
          L.fecha_creacion,
          L.permiso_operacion
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
      res.json({
        data: rows,
        message: `Localidades del mercado: ${rows[0].nombre_mercado}`,
        status: "ok",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default Market;
