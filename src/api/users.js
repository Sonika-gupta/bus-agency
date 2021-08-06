import fetch from './fetchData'

const route = 'users/'
async function getUsers () {
  return await fetch(route)
}

function addUser (user) {
  return fetch(route, user, 'POST')
}

function deleteUser ({ id }) {
  return fetch(route + id, {}, 'DELETE')
}

function updateUser (user) {
  return fetch(route, user, 'PUT')
}

const users = { getUsers, addUser, deleteUser, updateUser }
export default users
