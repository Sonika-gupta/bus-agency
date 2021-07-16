const defaultBus = require('../defaultBus')
const { getPostgresValues } = require('../utils')
const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool(config.dbConnectionObj)
pool.connect()

async function poolQuery (query, values = []) {
  try {
    const result = await pool.query(query, values)
    return [null, result.rows]
  } catch (err) {
    return [err, null]
  }
}

async function getAllBuses () {
  // TODO: Add limit with offset and pages
  const query = 'SELECT * FROM buses ORDER BY last_modified'
  return await poolQuery(query)
}

async function searchBuses (filters) {
  const query = 'SELECT * FROM buses WHERE source = $1'
  /* Object.entries(filters).forEach(([key, value]) => {
    query += `${key} = ${value}`
  }) */
  return await pool.query(query, [filters.source])
}

async function createBus (object) {
  const props = Object.keys(defaultBus).join(',')
  const values = getPostgresValues(defaultBus, object).join(',')
  const query = `INSERT INTO buses (${props}) VALUES (${values}) RETURNING *`
  console.log(props, values)
  return await poolQuery(query)
}

async function deleteBus (id) {
  const query = 'DELETE FROM buses WHERE id = $1'
  return await poolQuery(query, [id])
}
async function updateBus (bus) {
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

  console.log(query)
  return await pool.query(query, values)
}
module.exports = {
  getAllBuses,
  searchBuses,
  createBus,
  deleteBus,
  updateBus
}
