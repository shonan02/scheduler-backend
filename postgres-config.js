const db = require("./postgres-config");

const Pool = require('pg').Pool;

const pool = new Pool({
    //Database configuration
    user: "personal",
    host: "localhost",
    database: "scheduling",
    password: "post-root",
    port: 5432
});

module.exports = {
    pool
}