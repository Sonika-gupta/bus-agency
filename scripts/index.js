import { getBuses, getBus, newBus, updateBus, deleteBuses, getSeats, updateSeat } from './app.js'

function handleSearch (e) {
  e.preventDefault()
  const data = new FormData(e.target)
  console.log(data)
}
function loadList () {
  getBuses().then(buses => {
    console.log('index.js', buses)
    document.querySelector('bus-list').setAttribute('list', JSON.stringify(buses))
  })
}
function enableUserOptions () {
  const userPanel = document.getElementById('user')
  const userOptions = document.querySelector('.userOptions')
  userPanel.addEventListener('click', () => {
    userOptions.classList.remove('hidden')
  })
  userOptions.addEventListener('mouseleave', () => {
    userOptions.classList.add('hidden')
  })
  document.querySelector('nav').onmouseleave = () => {
    console.log('mouse left nav')
  }
}
function showForm () {
  document.querySelector('#addBusSection').classList.remove('hidden')
}
(function load () {
  loadList()
  document.querySelector('#showFormButton').onclick = showForm
  // enableUserOptions()
})()
