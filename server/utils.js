const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

function daysToBitString (array) {
  const bitArray = days.map(day => (array.includes(day) ? 1 : 0))
  return bitArray.join('')
}

function bitStringToDays (string) {
  const bits = string?.split('')
  return bits ? days.filter((day, i) => +bits[i]) : []
}

function toViewBuses ([...buses]) {
  buses.forEach(bus => {
    bus.runningDays = bitStringToDays(bus.runningDays)
    // bus.arrivalTime = bus.arrivalTime.split(0, 4)
    // bus.departTime = bus.departTime.split(0, 4)
  })
  return buses
}

function toModelBus (bus) {
  bus.runningDays = daysToBitString(bus.runningDays)
  return bus
}

function toCamelCase (string) {
  return string.replace(/(_[a-z])/g, s => s[1].toUpperCase())
}

function getStandardObject (object) {
  const standardObject = {}
  Object.entries(object).forEach(([key, value]) => {
    standardObject[toCamelCase(key)] = value
  })
  return standardObject
}

module.exports = {
  getStandardObject,
  toViewBuses,
  toModelBus,
  toCamelCase
}
