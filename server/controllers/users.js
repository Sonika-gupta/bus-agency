const db = require('../models/users')

async function readUsers (req, res) {
  const [error, result] = await db.getAllUsers()
  if (result) res.send(result)
  else res.send({ error, message: 'Read User Failed' })
}

async function filterUsers (req, res) {
  if (req.query) console.log(req.query)
  const [error, result] = await db.searchUsers(req.query)
  if (result) res.send(result)
  else res.send({ error, message: 'User Search Failed' })
}

async function createUser (req, res) {
  const [error, result] = await db.createUser(req.body)
  if (result) res.send(result)
  else res.send({ error, message: 'Create User Failed' })
}

async function deleteUser (req, res) {
  const [error, result] = await db.deleteUser(req.params.id)
  if (result) res.send(result)
  else res.send({ error, message: 'Delete User Failed' })
}

async function updateUser (req, res) {
  const [error, result] = await db.updateUser(req.body)
  if (result) res.send(result)
  else res.send({ error, message: 'Update User Failed' })
}

module.exports = {
  readUsers,
  filterUsers,
  createUser,
  deleteUser,
  updateUser
}
