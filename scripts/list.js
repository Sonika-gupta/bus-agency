import { createItem } from './utils.js'

const template = document.createElement('template')
template.innerHTML = `
<link rel="stylesheet" href="/styles/list.css">
<ul class="list"></ul>
`
class BusList extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const ul = this.shadowRoot.querySelector('ul')
    const list = JSON.parse(this.getAttribute('list'))
    if(list) {
      list.forEach(item => {
        console.log(item)
        const entry = createItem('bus-entry')
        Object.keys(entry.props).forEach(key => {
          entry.props[key] = item[key]
        })
        ul.appendChild(createItem('li', {}, entry))
      })
    }
  }
  static get observedAttributes() {
    return ["list"]
  }
  attributeChangedCallback (prop, oldval, newval) {
    if(prop === "list") this.render()
  }
  connectedCallback() {
    console.log('List is connected!')
    this.render()
  }
}
customElements.define('bus-list', BusList)