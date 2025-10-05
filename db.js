import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "admin",
  database: process.env.DB_NAME || "mydb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connection = await pool.getConnection();
console.log("✅ Connected to MySQL via Pool!");
connection.release();

await pool.query(
  `CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`
);
console.log("✅ Messages table is ready!");

export default pool;
