const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

const busProperties = {
  bus_number: 'busNumber',
  bus_name: 'busName',
  source: 'source',
  destination: 'destination',
  depart_time: 'departTime',
  arrival_time: 'arrivalTime',
  bus_type: 'busType',
  chart: 'chart',
  running_days: 'runningDays',
  amenities: 'amenities',
  seat_fare: 'seatFare',
  sleeper_fare: 'sleeperFare',
  agent_seat_fare: 'agentSeatFare',
  agent_sleeper_fare: 'agentSleeperFare'
}

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
  busProperties,
  toViewBuses,
  toModelBus
}
