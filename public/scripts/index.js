import { getBuses } from './fetch.js'

async function loadList () {
  const buses = await getBuses()
  console.log('index.js', buses)

  // TODO: Remove list from view. Send using slots.
  document.querySelector('bus-list').setAttribute('list', JSON.stringify(buses))
  /*   const busList = createItem('bus-list', { list: buses })
  document.querySelector('#busListSection').appendChild(busList) */
}
/* function handleSearch (e) {
  e.preventDefault()
  const data = new FormData(e.target)
  console.log(data)
} */
function showForm () {
  document.querySelector('#addBusSection').classList.remove('hidden')
}
(function load () {
  loadList()
  document.querySelector('#showFormButton').onclick = showForm
})()
