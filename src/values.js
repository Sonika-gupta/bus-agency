const initBus = {
  busNumber: '',
  busName: '',
  source: '',
  destination: '',
  departTime: '',
  arrivalTime: '',
  runningDays: [],
  amenities: [],
  seatFare: '',
  sleeperFare: '',
  agentSeatFare: '',
  agentSleeperFare: '',
  busType: 'volvo',
  chart: '35-seater'
}

const busChartType = ['35-seater', '45-seater']

const busType = [
  'volvo',
  'AC seater sleeper',
  'non-AC seater',
  'non-AC seater sleeper'
]

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

export { initBus, busType, busChartType, days, amenities }
