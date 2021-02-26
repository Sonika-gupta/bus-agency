
function refine (data) {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      data.forEach((element) => {
        for (let j = 0; j < Object.keys(element); j++) {}
      })
    } else data = snakeToCamel(data)
  }
  return data
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
export { createItem }
