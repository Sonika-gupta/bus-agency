const { getStandardObject } = require('../utils')
const { Pool } = require('pg')
const config = require('../config')
const pool = new Pool(config.dbConnectionObj)
pool.connect()

async function poolQuery (query, values = []) {
  console.log('querying', query, values)
  try {
    const result = await pool.query(query, values)
    return [null, result.rows.map(row => getStandardObject(row))]
  } catch (err) {
    console.log(err)
    return [err, null]
  }
}

module.exports = poolQuery
