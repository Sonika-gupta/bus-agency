import { newBus } from './fetch.js'
import { showBusForm } from './utils.js'

async function addBusHandler (value) {
  const res = await newBus(value)
  console.log('Bus Added Successfully', res)
  document.querySelector('bus-list').addEntry(value)
  this.dispatchEvent(new CustomEvent('close', { bubbles: true }))
  return res
}

(function load () {
  document.querySelector('#showFormButton').clickFunction = () => showBusForm(addBusHandler)
  document.body.addEventListener('edit', (event) => {
    console.log('edited')
    console.log(event.detail)
  })
})()
