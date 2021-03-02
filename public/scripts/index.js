import { newBus } from './fetch.js'
import { createItem } from './utils.js'

async function addBusHandler (value) {
  const res = await newBus(value)
  console.log('Bus Added Successfully', res)
  return res
}

function showBusForm (detail) {
  const form = createItem('bus-form', { submit: addBusHandler })
  document.body.appendChild(createItem('custom-modal', { content: form }, form))
}

(function load () {
  document.querySelector('#showFormButton').clickFunction = showBusForm
  // document.querySelector('custom-modal').addEventListener('success', (event) => busList.addEntry(event.detail))
})()
