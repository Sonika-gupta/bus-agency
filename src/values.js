const initBus = {
  bus_number: '',
  bus_name: '',
  source: '',
  destination: '',
  depart_time: '',
  arrival_time: '',
  running_days: [],
  amenities: [],
  seat_fare: '',
  sleeper_fare: '',
  agent_seat_fare: '',
  agent_sleeper_fare: '',
  bus_type: 'volvo',
  chart: '35-seater'
}

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

const amenities = [
  'water bottle',
  'snacks',
  'blanket',
  'toilet',
  'charging point',
  'movie',
  'bus tracker',
  'emergency contact',
  'reschedulable',
  'live tracking'
]

export { initBus, days, amenities }
