import { getBuses } from './app.js'
import { createItem } from './utils.js'
import { busProperties } from './busModel.js'
// import BusEntry from './busEntry.js'

const template = document.createElement('template')
template.innerHTML = `
<link rel="stylesheet" href="/styles/busList.css">
<ul class="bus-list"></ul>
<script type="module" src="busEntry.js"></script>
`
class BusList extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  render(buses) {
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const busList = this.shadowRoot.querySelector('.bus-list')
    buses.forEach(bus => {
      console.log(bus)
      const busEntry = createItem('li', {}, document.createElement('bus-entry'))
      busProperties.forEach(key => {
        busEntry.appendChild(createItem('span', {slot: key}, bus[key]!=null ? bus[key].toString() : ''))
      })
      busList.appendChild(busEntry)
    })
  }

 /*  get count() {
    return this.getAttribute('count')
  }

  set count(val) {
    return this.setAttribute('count', val)
  }
  static get observedAttributes() {
    return ["count"]
  }

  attributeChangedCallback (prop, oldval, newval) {
    if(prop === "count") this.render()
  }
   */
  connectedCallback() {
    getBuses().then(buses => this.render(buses))
    console.log('Bus List is connected!')
  }
}
customElements.define('bus-list', BusList)