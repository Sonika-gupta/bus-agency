const db = require('../models/serviceProviders')

async function readServiceProviders (req, res) {
  const [error, result] = await db.getAllServiceProviders()
  if (result) res.send(result)
  else res.send({ error, message: 'Read Service Provider Failed' })
}
async function createServiceProvider (req, res) {
  const [error, result] = await db.createServiceProvider(req.body)
  if (result) res.send(result)
  else res.send({ error, message: 'Create Service Provider Failed' })
}

async function deleteServiceProvider (req, res) {
  const [error, result] = await db.deleteServiceProvider(req.params.id)
  if (result) res.send(result)
  else res.send({ error, message: 'Delete Service Provider Failed' })
}

async function updateServiceProvider (req, res) {
  const [error, result] = await db.updateServiceProvider(req.body)
  if (result) res.send(result)
  else res.send({ error, message: 'Update Service Provider Failed' })
}

module.exports = {
  readServiceProviders,
  createServiceProvider,
  deleteServiceProvider,
  updateServiceProvider
}
