async function fetch (route, data, method = 'GET') {
  console.log('requesting', route, data, method)
  const res = await window
    .fetch('http://localhost:4000/' + route, {
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
  return await fetch('buses')
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
  newBus,
  deleteBus,
  updateBus
}
