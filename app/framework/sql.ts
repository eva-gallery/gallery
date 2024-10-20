'use server'
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 9,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export default async function sql(query: string) {
    let connection;

    try {
        connection = await pool.getConnection();
        const [data, fields] = await connection.query(query);

        //console.log("*** query ***");
        //console.log(query);
        // console.log("*** fields ***");
        // console.log(fields);
        // console.log("*** data ***");
        // console.log(data);
        return data;

    } catch (err) {
        console.log("error");
        console.log(err);
        throw err;

    } finally {
        if (connection) connection.release();
    }
}
