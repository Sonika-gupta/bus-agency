const defaultBus = require('../defaultBus')
const { getPostgresValues } = require('../utils')
const poolQuery = require('./poolQuery')

function getAllBuses () {
  // TODO: Add limit with offset and pages
  const query = 'SELECT * FROM buses ORDER BY last_modified'
  return poolQuery(query)
}

function searchBuses (filters) {
  const query = 'SELECT * FROM buses WHERE source = $1'
  /* Object.entries(filters).forEach(([key, value]) => {
    query += `${key} = ${value}`
  }) */
  return pool.query(query, [filters.source])
}

function createBus (object) {
  const props = Object.keys(defaultBus).join(',')
  const values = getPostgresValues(defaultBus, object).join(',')
  const query = `INSERT INTO buses (${props}) VALUES (${values}) RETURNING *`
  console.log(props, values)
  return poolQuery(query)
}

function deleteBus (id) {
  const query = 'DELETE FROM buses WHERE id = $1 RETURNING *'
  return poolQuery(query, [id])
}
function updateBus (bus) {
  const query = `UPDATE buses
    SET bus_number = $1,
    bus_name = $2,
    source = $3,
    destination = $4,
    depart_time = $5,
    arrival_time = $6,
    chart = $7,
    running_days = $8,
    seat_fare = $9,
    sleeper_fare = $10,
    agent_seat_fare = $11,
    agent_sleeper_fare = $12,
    amenities = $13
    where id = $14
    RETURNING *`
  const values = [
    bus.bus_number,
    bus.bus_name,
    bus.source,
    bus.destination,
    bus.depart_time,
    bus.arrival_time,
    bus.chart,
    bus.running_days,
    bus.seat_fare,
    bus.sleeper_fare,
    bus.agent_seat_fare,
    bus.agent_sleeper_fare,
    bus.amenities,
    bus.id
  ]
  return poolQuery(query, values)
}
module.exports = {
  getAllBuses,
  searchBuses,
  createBus,
  deleteBus,
  updateBus
}
