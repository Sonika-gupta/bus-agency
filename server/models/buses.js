const { getPostgresValues, busProperties } = require('../utils')
const poolQuery = require('./poolQuery')

async function getAllBuses () {
  // TODO: Add limit with offset and pages
  const query = 'SELECT * FROM buses ORDER BY last_modified'
  return await poolQuery(query)
}

function searchBuses (filters) {
  const query = 'SELECT * FROM buses WHERE source = $1'
  /* Object.entries(filters).forEach(([key, value]) => {
    query += `${key} = ${value}`
  }) */
  return poolQuery(query, [filters.source])
}

function createBus (bus) {
  const props = busProperties.join(',')
  const paramString = Array.from(busProperties, (value, i) => '$' + (i + 1))
  const query = `INSERT INTO buses (${props}) VALUES (${paramString}) RETURNING *`
  const values = getPostgresValues(bus)
  return poolQuery(query, values)
}

function deleteBus (id) {
  const query = 'DELETE FROM buses WHERE id = $1 RETURNING *'
  return poolQuery(query, [id])
}
function updateBus (bus) {
  const props = busProperties.map((key, i) => `${key}=$${i + 1}`).join(',')
  const query = `UPDATE buses
    SET ${props}
    where id = $${busProperties.length + 1}
    RETURNING *`

  const values = [...getPostgresValues(bus), bus.id]
  return poolQuery(query, values)
}
module.exports = {
  getAllBuses,
  searchBuses,
  createBus,
  deleteBus,
  updateBus
}
