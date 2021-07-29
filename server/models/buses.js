const { toViewBuses, toModelBus, busProperties } = require('../utils')
const poolQuery = require('./poolQuery')

const properties = Object.keys(busProperties)
const getPostgresValues = bus =>
  Object.values(busProperties).map(key => bus[key])

async function getAllBuses () {
  // TODO: Add limit with offset and pages
  const query = 'SELECT * FROM buses ORDER BY last_modified'
  const [err, res] = await poolQuery(query)
  return [err, toViewBuses(res)]
}

async function searchBuses (filters) {
  const query = 'SELECT * FROM buses WHERE source = $1'
  /* Object.entries(filters).forEach(([key, value]) => {
    query += `${key} = ${value}`
  }) */
  const [err, res] = await poolQuery(query, [filters.source])
  return [err, toViewBuses(res)]
}

async function createBus (bus) {
  const props = busProperties.join(',')
  const paramString = Array.from(
    { length: properties.length },
    (v, i) => '$' + (i + 1)
  )
  const query = `INSERT INTO buses (${props}) VALUES (${paramString}) RETURNING *`
  const values = getPostgresValues(bus)
  const [err, res] = await poolQuery(query, values)
  return [err, toViewBuses(res)[0]]
}

async function deleteBus (id) {
  const query = 'DELETE FROM buses WHERE id = $1 RETURNING *'
  const [err, res] = await poolQuery(query, [id])
  return [err, toViewBuses(res)[0]]
}

async function updateBus (bus) {
  bus = toModelBus(bus)
  const props = properties.map((key, i) => `${key}=$${i + 1}`).join(',')
  const query = `UPDATE buses
    SET ${props}
    where id = $${properties.length + 1}
    RETURNING *`

  const values = [...getPostgresValues(bus), bus.id]
  const [err, res] = await poolQuery(query, values)
  return [err, toViewBuses(res)[0]]
}
module.exports = {
  getAllBuses,
  searchBuses,
  createBus,
  deleteBus,
  updateBus
}
