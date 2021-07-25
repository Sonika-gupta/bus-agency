const initBus = {
  number: '',
  name: '',
  source: '',
  destination: '',
  departure: '',
  arrival: '',
  days: [],
  amenities: [],
  seat_fare: 0,
  sleeper_fare: 0,
  agent_seat_fare: 0,
  agent_sleeper_fare: 0,
  type: 'volvo',
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
