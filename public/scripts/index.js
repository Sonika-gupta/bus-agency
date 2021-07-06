import { newBus, searchBuses } from './fetch.js'
import { showBusForm } from './utils.js'

async function addBusHandler (value) {
  const res = await newBus(value)
  console.log('Bus Added Successfully', res)
  document.querySelector('bus-list').addEntry(res[0])
  this.dispatchEvent(new CustomEvent('close', { bubbles: true }))
  return res
}

function addFilters () {
  // const searchParams = new URLSearchParams()
  const params = {}
  document.querySelectorAll('#filterPanel input').forEach(filter => {
    filter.addEventListener('change', async () => {
      console.log(filter.name)
      params[filter.name] = filter.value
      const buses = await searchBuses(params)
      document.querySelector('bus-list').updateList(buses)
    })
  })
}

(function load () {
  document.querySelector('#showFormButton').clickFunction = () => showBusForm(addBusHandler)
  addFilters()
})()
