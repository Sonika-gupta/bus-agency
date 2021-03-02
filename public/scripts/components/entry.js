import { calcDuration } from '../utils.js'
import { deleteBus } from '../fetch.js'
class BusEntry extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.props = {}
  }

  render () {
    const template = document.createElement('template')
    template.innerHTML = `
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link rel="stylesheet" href="/styles/entry.css" />
    <div class="item">
      <div class="details col">
        <span>${this.props.bus_number}</span>
        <span class="emphasis">${this.props.bus_name}</span>
        <slot name="busType"></slot>
      </div>
      <div class="panel">
        <div class="stop-location col">
          <span class="emphasis">${this.props.depart_time}</span>
          <span>${this.props.source}</span>
        </div>
        <div class="duration col">${calcDuration(this.props.depart_time, this.props.arrival_time)}</div>
        <div class="stop-location col">
          <span class="emphasis">${this.props.arrival_time}</span>
          <span>${this.props.destination}</span>
        </div>
      </div>
      <div class="action col">
        <div>INR <span class="price emphasis">${this.props.seat_fare}</span> /- per seat</div>
        <div>
          <i id="editBusButton" class="fa fa-edit"></i>
          <i id="deleteBusButton" class="fa fa-trash-o"></i>
        </div>
        <!-- <default-button id="viewSeatsButton" text="View Seats"></default-button> -->
      </div>
    </div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('#editBusButton').onclick = () => this.editBus()
    this.shadowRoot.querySelector('#deleteBusButton').onclick = () => this.deleteBus()
  }

  connectedCallback () {
    this.render()
    console.log('Entry is connected!')
  }

  disconnectedCallback () {
    this.remove()
  }

  editBusHandler () {
    const editEntry = new CustomEvent('edit', {
      bubbles: true,
      detail: this.props
    })
    this.dispatchEvent(editEntry)
  }

  /*   async handleSubmit (e) {
    e.preventDefault()
    console.log('handle submit', e.target.action)
    const data = new FormData(e.target)
    const value = Object.fromEntries(data.entries())
    value.amenities = data.getAll('amenities')
    value.running_days = data.getAll('running_days')
    try {
      const res = newBus(value)
      console.log('Bus Added Successfully', res)
      const saveEntry = new CustomEvent('save', { bubbles: true, detail: value })
      this.getRootNode().host.dispatchEvent(saveEntry)
    } catch (err) {
      window.alert(err)
    }
  } */

  async deleteBus () {
    // TODO: Use Notification Modal
    if (window.confirm(`Delete Bus ${this.props.bus_name}?`)) {
      try {
        const res = await deleteBus({ id: this.props.id })
        console.log('Deleted Successfully', res)
        // TODO: update list?
        this.disconnectedCallback()
      } catch (error) {
        window.alert(error)
      }
    }
  }
}

customElements.define('bus-entry', BusEntry)
