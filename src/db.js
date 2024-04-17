import mysql2 from "mysql2/promise";
import { pool } from "./config.js";

export const connect = async () => {
    try {
        console.log("Database is connected");
        return await mysql2.createConnection(pool)
    } catch (error) {
        console.log(error);
    }
}