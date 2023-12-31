const Pool = require('pg').Pool;

const pool = new Pool({
    //Database configuration
    user: "postgres",
    host: "localhost",
    database: "scheduler",
    password: "root",
    port: 5432
});

module.exports = {
    pool
}