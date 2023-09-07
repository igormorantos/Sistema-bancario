const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Forfun23!',
    database: 'bancodedados'
})

module.exports = pool;