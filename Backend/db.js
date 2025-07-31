const sql = require('mssql')

console.log(process.env.DB_NAME)
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'memoriadb921921.database.windows.net',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

const pool = new sql.ConnectionPool(sqlConfig).connect()
/*
(async () => {
 try {
  // make sure that any items are correctly URL encoded in the connection string
  await sql.connect(sqlConfig)
  const result = await sql.query`select * from Trips`
  console.dir(result)
 } catch (err) {
  // ... error checks
 }
})()*/

module.exports = {pool, sqlConfig};
