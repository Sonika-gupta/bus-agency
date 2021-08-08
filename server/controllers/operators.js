const db = require('../models/operators')

async function readOperators (req, res) {
  const [error, result] = await db.getAllOperators()
  if (result) res.send(result)
  else res.send({ error, message: 'Read Service Provider Failed' })
}
async function createOperator (req, res) {
  const [error, result] = await db.createOperator(req.body)
  if (result) res.send(result)
  else res.send({ error, message: 'Create Service Provider Failed' })
}

async function deleteOperator (req, res) {
  const [error, result] = await db.deleteOperator(req.params.id)
  if (result) res.send(result)
  else res.send({ error, message: 'Delete Service Provider Failed' })
}

async function updateOperator (req, res) {
  const [error, result] = await db.updateOperator(req.body)
  if (result) res.send(result)
  else res.send({ error, message: 'Update Service Provider Failed' })
}

module.exports = {
  readOperators,
  createOperator,
  deleteOperator,
  updateOperator
}
