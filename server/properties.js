const bus = [
  'bus_number',
  'bus_name',
  'source',
  'destination',
  'depart_time',
  'arrival_time',
  'bus_type',
  'chart',
  'running_days',
  'amenities',
  'seat_fare',
  'sleeper_fare',
  'agent_seat_fare',
  'agent_sleeper_fare'
]

const user = [
  'type',
  'fname',
  'lname',
  'username',
  'email',
  'contact',
  'is_active'
]

const operator = [
  'name',
  'vat_no',
  'address_line1',
  'address_line2',
  'city',
  'state',
  'pincode',
  'contact',
  'landline',
  'fax',
  'comments',
  'designation'
]

module.exports = { bus, user, operator }
