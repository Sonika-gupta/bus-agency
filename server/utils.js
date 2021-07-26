const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

const busProperties = [
  'bus_number',
  'bus_name',
  'source',
  'destination',
  'depart_time',
  'arrival_time',
  'chart',
  'running_days',
  'amenities',
  'seat_fare',
  'sleeper_fare',
  'agent_seat_fare',
  'agent_sleeper_fare'
]
function daysToBitString (array) {
  const bitArray = days.map(day => (array.includes(day) ? 1 : 0))
  return bitArray.join('')
}

function bitStringToDays (string) {
  const running_days = string.split('')
  return days.filter((day, i) => +running_days[i])
}

function getValues (bus) {
  if (!bus.running_days) bus.running_days = []
  else bus.running_days = bitStringToDays(bus.running_days)
  return bus
}

function getPostgresValues (bus) {
  bus.running_days = daysToBitString(bus.running_days)
  return busProperties.map(key => bus[key])
}

module.exports = { getPostgresValues, getValues, busProperties }
