function showBusForm (formSubmitFunction, data = {}) {
  const form = createItem('bus-form', { data, submit: formSubmitFunction })
  document.body.appendChild(createItem('custom-modal', { content: form }))
}

function createItem (type, props, ...children) {
  const item = document.createElement(type)
  if (props) Object.assign(item, props)
  for (const child of children) {
    if (typeof child !== 'string') item.appendChild(child)
    else item.appendChild(document.createTextNode(child))
  }
  return item
}

function calcDuration (departTime, arrivalTime) {
  // console.log(departTime)
  departTime = departTime.match(/^([0-9][0-9]):([0-5][0-9])/)
  arrivalTime = arrivalTime.match(/^([0-9][0-9]):([0-5][0-9])/)
  const [hoursD, minutesD] = departTime ? [Number(departTime[1]), Number(departTime[2])] : [0, 0]
  let [hoursA, minutesA] = arrivalTime ? [Number(arrivalTime[1]), Number(arrivalTime[2])] : [0, 0]
  if (hoursA < hoursD) hoursA += 24
  const duration = ((hoursA * 60 + minutesA) - (hoursD * 60 + minutesD))
  return `${Math.trunc(duration / 60)} hrs ${duration % 60} mins`
}

export { showBusForm, createItem, calcDuration }
