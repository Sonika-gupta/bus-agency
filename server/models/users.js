const poolQuery = require('./poolQuery')

async function getAllUsers () {
  // TODO: Add limit with offset and pages
  const query = 'SELECT * FROM users'
  return await poolQuery(query)
}
/*
async function createUser (object) {
  const query = `INSERT INTO users (type, username, email, password) VALUES (${object.type}, ${o}) RETURNING *`
  console.log(props, values)
  return await poolQuery(query)
}

async function deleteUser (id) {
  const query = 'DELETE FROM users WHERE id = $1'
  return await poolQuery(query, [id])
}
 */
module.exports = {
  getAllUsers
  //   createUser,
  //   deleteUser
}
