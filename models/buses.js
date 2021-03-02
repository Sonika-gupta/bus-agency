const defaultBus = require('../defaultBus')
const { getPostgresValues } = require('../utils')
const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool(config.dbConnectionObj)
pool.connect()

async function getAllBuses () {
  // TODO: Add limit with offset and pages
  const query = 'SELECT * FROM buses ORDER BY last_modified'
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}

async function createBus (object) {
  const props = Object.keys(defaultBus).join(',')
  const values = getPostgresValues(defaultBus, object).join(',')
  const query = `INSERT INTO buses (${props}) VALUES (${values})`
  console.log(props, values)
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}

async function deleteBus () {
  const query = 'DELETE FROM buses WHERE id = $1'
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
/* async function readBusById () {
  const query = 'SELECT * FROM buses WHERE id = $1'
try {
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
async function updateBus () {
  const { id, key, value } = request.body
  const query = 'UPDATE buses SET $1 = \'$2\' where id = $3'
try {
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
async function deleteBuses () {
  const ids = request.body.ids
  const query = `DELETE FROM buses WHERE id IN (${ids.join(', ')})`
try {
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
async function readSeats () {
  const query = 'SELECT * FROM seats WHERE busId = $1'
try {
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
async function updateSeat () {
  const { id, key, value } = request.body
  const query = 'UPDATE seats SET $1 = \'$2\' where id = $3'
try {
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
 */
module.exports = {
  getAllBuses,
  createBus,
  deleteBus
/*   readBusById,
  updateBus,
  deleteBuses,
  readSeats,
  updateSeat
 */ }
