const db = require('../models/buses')

async function readBuses (req, res) {
  try {
    const result = await db.getAllBuses()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: 'Read Bus Failed' })
  }
}

async function createBus (req, res) {
  try {
    const result = await db.createBus(req.body)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: 'Create Bus Failed' })
  }
}

async function deleteBus (req, res) {
  try {
    const result = await db.deleteBus()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: 'Delete Bus Failed' })
  }
}

module.exports = {
  readBuses,
  createBus,
  deleteBus
}
