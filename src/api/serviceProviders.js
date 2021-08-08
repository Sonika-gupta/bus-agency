import fetch from './fetchData'

const route = 'serviceProviders/'
async function getServiceProviders () {
  return await fetch(route)
}

function addServiceProvider (serviceProvider) {
  return fetch(route, serviceProvider, 'POST')
}

function deleteServiceProvider ({ id }) {
  return fetch(route + id, {}, 'DELETE')
}

function updateServiceProvider (serviceProvider) {
  return fetch(route, serviceProvider, 'PUT')
}

const serviceProviders = {
  getServiceProviders,
  addServiceProvider,
  deleteServiceProvider,
  updateServiceProvider
}
export default serviceProviders
