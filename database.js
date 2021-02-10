const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: '1234',
  database: 'bus_agency'
})
pool.connect()
function requestDb (text, response, responseValue) {
  console.log('Querying: ', text)
  return new Promise((resolve, reject) => {
    pool.query(text,
      (error, result) => {
        if (error) {
          response.status(500)
          throw error
        } else {
          const data = typeof responseValue === 'string' ? eval(responseValue) : responseValue
          response.status(200).send(data)
        }
      })
  })
}

const readBuses = (request, response) => {
  const query = 'SELECT * FROM buses ORDER BY id ASC'
  return requestDb(query, response, 'result.rows')
}
const readBusById = (request, response) => {
  const id = request.params.id
  const query = `SELECT * FROM buses WHERE id =${id}`
  requestDb(query, response, 'result.rows[0]')
}
const createBus = (request, response) => {
  const { busNumber,
    name,
    source,
    destination,
    arrivalTime,
    departureTime,
    sleeperFare,
    seatFare,
    agentSeatFare,
    agentSleeperFare } = request.body
  const query = `INSERT INTO buses (bus_number, name, source, destination, depart_time, arrival_time, sleeper_fare, seat_fare, agent_seat_fare, agent_sleeper_fare) VALUES (${busNumber}, '${name}', ${source}, ${destination}, ${arrivalTime}, ${departureTime}, ${sleeperFare}, ${seatFare}, ${agentSeatFare}, ${agentSleeperFare}) RETURNING *`
  console.log(query)
  requestDb(query, response, 'result.rows[0]')
}
const updateBus = (request, response) => {
  const { id, key, value } = request.body
  const query = `UPDATE buses SET ${key} = '${value}' where id = ${id}`
  requestDb(query, response, { message: `Bus ${id} modified` })
}
const deleteBus = (request, response) => {
  const id = request.body.id
  const query = `DELETE FROM buses WHERE id = ${id}`
  requestDb(query, response, { message: `Bus ${id} Deleted` })
}
/* const deleteBuses = (request, response) => {
  const ids = request.body.ids
  const query = `DELETE FROM buses WHERE id IN (${ids.join(', ')})`
  requestDb(query, response, { message: `Buses ${ids} Deleted` })
} */
const readSeats = (request, response) => {
  const busId = request.params.busId
  const query = `SELECT * FROM seats WHERE busId = ${busId}`
  requestDb(query, response, 'result.rows')
}
const updateSeat = (request, response) => {
  const { id, key, value } = request.body
  const query = `UPDATE seats SET ${key} = '${value}' where id = ${id}`
  requestDb(query, response, { message: `Seat ${id} modified` })
}

module.exports = {
  readBuses,
  readBusById,
  createBus,
  updateBus,
  deleteBus,
  //   deleteBuses,
  readSeats,
  updateSeat
}
