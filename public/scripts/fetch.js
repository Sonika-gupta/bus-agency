async function request (route, data, method = 'GET') {
  console.log('requesting', route, data, method)
  const value = await window
    .fetch('http://localhost:4000/' + route, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
  if (value.error) throw Error(value)
  return value
}

function getBuses () {
  return request('buses')
}
function newBus (bus) {
  return request('bus', bus, 'POST')
}
/* function getBus (id) {
  return request(`bus${id}`)
}
function updateBus (id, key, value) {
  return request('bus', { id, key, value }, 'PUT')
}
function deleteBuses (ids) {
  return request('buses', { ids }, 'DELETE')
}
function getSeats (busId) {
  return request(`tasks${busId}`)
}
function updateSeat (id, key, value) {
  return request('task', { id, key, value }, 'PUT')
} */
export {
  getBuses,
  newBus
/*   getBus,
  updateBus,
  deleteBuses,
  getSeats,
  updateSeat
 */ }
