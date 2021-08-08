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

const initUser = {
  type: 'customer',
  fname: '',
  lname: '',
  username: '',
  email: '',
  password: '',
  contact: '',
  isActive: true,
  lastActive: ''
}

const userType = ['admin', 'agent', 'customer']

const initOperator = {
  vatNo: '',
  name: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  contact: '',
  landline: '',
  fax: '',
  comments: '',
  designation: ''
}

export {
  initBus,
  busType,
  busChartType,
  days,
  amenities,
  initUser,
  userType,
  initOperator
}
