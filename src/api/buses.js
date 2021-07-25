import { fetchData as fetch } from './index'

const route = '/buses'
async function getBuses () {
  const res = await window.fetch(route)
  return await res.json()
}

async function searchBuses (filters) {
  console.log(filters)
  const searchUrl = new URL(route + '/filter')
  searchUrl.search = new URLSearchParams(filters).toString()
  const res = await window.fetch(searchUrl)
  console.log(res)
}

function addBus (bus) {
  return fetch(route, bus, 'POST')
}

function deleteBus ({ id }) {
  return fetch(route + id, {}, 'DELETE')
}

function updateBus (bus) {
  return fetch(route, bus, 'PUT')
}

const buses = { getBuses, searchBuses, addBus, deleteBus, updateBus }
export default buses
