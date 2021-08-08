import fetch from './fetchData'

const route = 'operators/'
async function getOperators () {
  return await fetch(route)
}

function addOperator (operator) {
  return fetch(route, operator, 'POST')
}

function deleteOperator ({ id }) {
  return fetch(route + id, {}, 'DELETE')
}

function updateOperator (operator) {
  return fetch(route, operator, 'PUT')
}

const operators = {
  getOperators,
  addOperator,
  deleteOperator,
  updateOperator
}
export default operators
