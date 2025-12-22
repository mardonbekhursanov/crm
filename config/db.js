const Pool = require("pg").Pool
const pg = require("pg")

pg.types.setTypeParser(20, val => parseInt(val, 10)); // 20 = BIGINT oid

// NUMERIC → JS float
pg.types.setTypeParser(1700, val => parseFloat(val)); // 1700 = NUMERIC oid
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

module.exports = pool