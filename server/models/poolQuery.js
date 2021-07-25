const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool(config.dbConnectionObj)
pool.connect()

async function poolQuery (query, values = []) {
  console.log('querying', query)
  try {
    const result = await pool.query(query, values)
    return [null, result.rows]
  } catch (err) {
    return [err, null]
  }
}

module.exports = poolQuery
