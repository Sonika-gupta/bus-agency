import { fetchData as fetch } from './index'

const route = '/users'
async function getUsers () {
  const res = await window.fetch(route)
  return await res.json()
}

async function searchUsers (filters) {
  console.log(filters)
  const searchUrl = new URL(route + '/filter')
  searchUrl.search = new URLSearchParams(filters).toString()
  const res = await window.fetch(searchUrl)
  console.log(res)
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

const users = { getUsers, searchUsers, addUser, deleteUser, updateUser }
export default users
