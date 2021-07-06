const url = 'http://localhost:4000/'

async function fetch (route, data, method = 'GET') {
  console.log('requesting', route, data, method)
  const res = await window
    .fetch(url + route, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  const value = await res.json()

  if (value.error) throw Error(value)

  return value
}

async function getBuses () {
  const res = await window.fetch(url + 'buses')
  return await res.json()
  // return await fetch('buses')
}

async function searchBuses (filters) {
  console.log(filters)
  const url = new URL('http://localhost:4000/buses/filter')
  url.search = new URLSearchParams(filters).toString()
  const res = await window.fetch(url)
  console.log(res)
}

function newBus (bus) {
  return fetch('buses', bus, 'POST')
}

function deleteBus ({ id }) {
  return fetch(`buses/${id}`, {}, 'DELETE')
}

function updateBus (bus) {
  return fetch('buses', bus, 'PUT')
}

export {
  getBuses,
  searchBuses,
  newBus,
  deleteBus,
  updateBus
}
