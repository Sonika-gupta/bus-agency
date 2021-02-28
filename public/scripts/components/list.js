import { getBuses } from '../fetch.js'
import { createItem } from '../utils.js'

const template = document.createElement('template')
template.innerHTML = `
<link rel="stylesheet" href="/styles/list.css">
<ul class="list">
  <slot name="entry"></slot>
</ul>
`
class BusList extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.list = []
  }

  render () {
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    if (this.list) {
      this.list.forEach(item => this.addEntry(item))
    }
    this.addEventListener('update', this.updateList)
  }

  addEntry (item) {
    const entry = createItem('bus-entry', { slot: 'entry' })
    Object.assign(entry.props, item)
    entry.addEventListener('delete', () => this.deleteEntry(entry))
    this.appendChild(entry)
  }

  deleteEntry (entry) {
    console.log('deleting')
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === entry.props.id) {
        this.list.splice(i, 1)
        break
      }
    }
    this.removeChild(entry)
  }

  async connectedCallback () {
    console.log('List is connected!')
    this.list = await getBuses()
    this.render()
  }
}
customElements.define('bus-list', BusList)
