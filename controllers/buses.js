const db = require('../models/buses')

async function readBuses (req, res) {
  const [error, result] = await db.getAllBuses()
  if (result) res.send(result)
  else {
    console.log(error)
    res.send({ error: true, message: 'Read Bus Failed' })
  }
}

async function filterBuses (req, res) {
  if (req.query) console.log(req.query)
  const [error, result] = await db.searchBuses(req.query)
  if (result) res.send(result)
  else res.send({ error: true, message: 'Bus Search Failed' })
}

async function createBus (req, res) {
  const [error, result] = await db.createBus(req.body)
  if (result) res.send(result)
  else res.send({ error: true, message: 'Create Bus Failed' })
}

async function deleteBus (req, res) {
  const [error, result] = await db.deleteBus(req.params.id)
  if (result) res.send(result)
  else res.send({ error: true, message: 'Delete Bus Failed' })
}

async function updateBus (req, res) {
  const [error, result] = await db.updateBus(req.body)
  if (result) res.send(result)
  else res.send({ error: true, message: 'Update Bus Failed' })
}

module.exports = {
  readBuses,
  filterBuses,
  createBus,
  deleteBus,
  updateBus
}
