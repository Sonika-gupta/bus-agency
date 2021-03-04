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

async function deleteBus (id) {
  const query = 'DELETE FROM buses WHERE id = $1'
  try {
    const result = await pool.query(query, [id])
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
async function updateBus (bus) {
  console.log(bus)
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
    agent_sleeper_fare = $12
    where id = $13
    RETURNING *`
  const values = [bus.bus_number,
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
    bus.id]

  console.log(query)
  try {
    const result = await pool.query(query, values)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getAllBuses,
  createBus,
  deleteBus,
  updateBus
}
