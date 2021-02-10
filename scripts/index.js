import { getBuses, getBus, newBus, updateBus, deleteBuses, getSeats, updateSeat } from './app.js'

function handleSubmit(e) {
  e.preventDefault()
  const data = new FormData(e.target)
  const value = Object.fromEntries(data.entries())
  value.busType = data.getAll("busType")
  value.amenities = data.getAll("amenities")
  value.running_days = data.getAll("runningDays")
  newBus(value).then(result => {
    console.log(result)
  })
  // console.log(value)
}

function load() {
  const addBusButton = document.getElementById('addBusButton')
  addBusButton.addEventListener('click', () => {
    document.getElementById('addBusForm').classList.remove('hidden')
  })

  const busForm = document.forms["addBusForm"]
  busForm.addEventListener('submit', handleSubmit)
}

load()