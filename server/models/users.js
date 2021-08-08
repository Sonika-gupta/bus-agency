const { user: properties } = require('../properties')
const { toCamelCase } = require('../utils')
const poolQuery = require('./poolQuery')

const getPostgresValues = user => properties.map(key => user[toCamelCase(key)])

async function getAllUsers () {
  // TODO: Add limit with offset and pages
  const query = `SELECT * FROM users`
  const [err, res] = await poolQuery(query)
  return [err, res]
}

async function createUser (user) {
  const props = properties.join(',')
  const paramString = Array.from(
    { length: properties.length },
    (v, i) => '$' + (i + 1)
  )
  const query = `INSERT INTO users (${props}) VALUES (${paramString}) RETURNING *`
  const values = getPostgresValues(user)
  const [err, res] = await poolQuery(query, values)
  return [err, res && res[0]]
}

async function deleteUser (id) {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
  const [err, res] = await poolQuery(query, [id])
  return [err, res && res[0]]
}

async function updateUser (user) {
  const props = properties.map((key, i) => `${key}=$${i + 1}`).join(',')
  const query = `UPDATE users
    SET ${props}
    where id = $${properties.length + 1}
    RETURNING *`

  const values = [...getPostgresValues(user), user.id]
  const [err, res] = await poolQuery(query, values)
  return [err, res && res[0]]
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser
}
