const busFormSection = document.querySelector('#busFormSection')
const busList = document.querySelector('bus-list')

function showBusForm (data = {}) {
  const form = document.querySelector('bus-form')
  form.data = data
  busFormSection.classList.remove('hidden')
}
function hideBusForm () {
  busFormSection.classList.add('hidden')
}

(function load () {
  document.querySelector('#showFormButton').onclick = showBusForm
  busList.addEventListener('edit', (event) => {
    showBusForm(event.detail)
  })
  busFormSection.addEventListener('update', (event) => {
    hideBusForm()
    busList.addEntry(event.detail)
  })
})()
