const defaultBus = require('./defaultBus')
const { getPostgresValues } = require('./utils')
const { Pool } = require('pg')
const config = require('./config')

const pool = new Pool(config.dbConnectionObj)
pool.connect()

function requestDb (response, query, values = []) {
  console.log('Querying: ', query, values)
  pool.query(query, values, (error, result) => {
    if (error) {
      response.status(500).send(error)
      throw error
    } else {
      response.status(200).send(result.rows)
    }
  })
}

const readBuses = (request, response) => {
  // TODO: Add limit with offset and pages
  const query = 'SELECT * FROM buses ORDER BY last_modified'
  return requestDb(response, query)
}
const createBus = (request, response) => {
  const props = Object.keys(defaultBus).join(',')
  const values = getPostgresValues(defaultBus, request.body).join(',')
  const query = `INSERT INTO buses (${props}) VALUES (${values})`
  console.log(props, values)
  requestDb(response, query)
}
const deleteBus = (request, response) => {
  const query = 'DELETE FROM buses WHERE id = $1'
  requestDb(response, query, [request.params.id])
}
/* const readBusById = (request, response) => {
  const query = 'SELECT * FROM buses WHERE id = $1'
  requestDb(response, query, [request.params.id])
}
const updateBus = (request, response) => {
  const { id, key, value } = request.body
  const query = 'UPDATE buses SET $1 = \'$2\' where id = $3'
  requestDb(response, query, [key, value, id])
}
const deleteBuses = (request, response) => {
  const ids = request.body.ids
  const query = `DELETE FROM buses WHERE id IN (${ids.join(', ')})`
  requestDb(query, response, { message: `Buses ${ids} Deleted` })
}
const readSeats = (request, response) => {
  const query = 'SELECT * FROM seats WHERE busId = $1'
  requestDb(response, query, [request.params.busId])
}
const updateSeat = (request, response) => {
  const { id, key, value } = request.body
  const query = 'UPDATE seats SET $1 = \'$2\' where id = $3'
  requestDb(response, query, [key, value, id])
}
 */
module.exports = {
  readBuses,
  createBus,
  deleteBus
/*   readBusById,
  updateBus,
  deleteBuses,
  readSeats,
  updateSeat
 */ }
