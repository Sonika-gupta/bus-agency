const { serviceProvider: properties } = require('../properties')
const { toCamelCase } = require('../utils')
const poolQuery = require('./poolQuery')

const getPostgresValues = serviceProvider =>
  properties.map(key => serviceProvider[toCamelCase(key)])

async function getAllServiceProviders () {
  // TODO: Add join query to get agent details from users table
  const query = `SELECT * FROM service_providers`
  const [err, res] = await poolQuery(query)
  return [err, res]
}

async function createServiceProvider (serviceProvider) {
  const props = properties.join(',')
  const paramString = Array.from(
    { length: properties.length },
    (v, i) => '$' + (i + 1)
  )
  const query = `INSERT INTO service_providers (${props}) VALUES (${paramString}) RETURNING *`
  const values = getPostgresValues(serviceProvider)
  const [err, res] = await poolQuery(query, values)
  return [err, res[0]]
}

async function deleteServiceProvider (id) {
  const query = 'DELETE FROM service_providers WHERE id = $1 RETURNING *'
  const [err, res] = await poolQuery(query, [id])
  return [err, res[0]]
}

async function updateServiceProvider (serviceProvider) {
  const props = properties.map((key, i) => `${key}=$${i + 1}`).join(',')
  const query = `UPDATE service_providers
    SET ${props}
    where id = $${properties.length + 1}
    RETURNING *`

  const values = [...getPostgresValues(serviceProvider), serviceProvider.id]
  const [err, res] = await poolQuery(query, values)
  return [err, res[0]]
}

module.exports = {
  getAllServiceProviders,
  createServiceProvider,
  deleteServiceProvider,
  updateServiceProvider
}
