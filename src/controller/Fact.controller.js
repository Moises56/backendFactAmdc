const Task = {}

import { connect } from "../db.js";

Task.getAllTasks = async (req, res) => {
    //obtener todas las tareas
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM facturacion');
    res.json(rows);
}