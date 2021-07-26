const { Pool } = require('pg')
const config = require('../config')
const { getValues } = require('../utils')

const pool = new Pool(config.dbConnectionObj)
pool.connect()

async function poolQuery (query, values = []) {
  console.log('querying', query, values)
  try {
    const result = await pool.query(query, values)
    result && result.rows.forEach((row, i) => (this[i] = getValues(row)))
    return [null, result.rows]
  } catch (err) {
    console.log(err)
    return [err, null]
  }
}

module.exports = poolQuery
