async function fetch (route, data, method = 'GET') {
  console.log('requesting', route, data, method)
  const res = await window.fetch('/api/' + route, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const value = await res.json()
  console.log('value: ', value)
  if (value.error) throw Error(value)

  return value
}

async function getBuses () {
  const res = await window.fetch('/api/buses')
  return await res.json()
  // return await fetch('buses')
}

async function searchBuses (filters) {
  console.log(filters)
  const searchUrl = new URL('/api/buses/filter')
  searchUrl.search = new URLSearchParams(filters).toString()
  const res = await window.fetch(searchUrl)
  console.log(res)
}

function addBus (bus) {
  return fetch('buses', bus, 'POST')
}

function deleteBus ({ id }) {
  return fetch(`buses/${id}`, {}, 'DELETE')
}

function updateBus (bus) {
  return fetch('buses', bus, 'PUT')
}

export { getBuses, searchBuses, addBus, deleteBus, updateBus }
