import { showBusForm, calcDuration } from '../utils.js'
import { deleteBus, updateBus } from '../fetch.js'

class BusEntry extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.props = {}
  }

  render () {
    // TODO: Move script out of render
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
        <div>₹ <span class="price emphasis">${this.props.seat_fare}</span>/seat</div>
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

  editBus () {
    showBusForm(async (value) => {
      this.props = await this.editBusHandler(value)
      // this.dispatchEvent(new CustomEvent('update', { bubbles: true }))
      this.update()
    }, this.props)
  }

  update () {
    this.shadowRoot.innerHTML = ''
    this.render()
  }

  async editBusHandler (value) {
    const res = await updateBus(value)
    console.log('Bus Updated Successfully', res[0])
    document.querySelector('bus-form').dispatchEvent(new CustomEvent('close', { bubbles: true }))
    return res[0]
  }

  async deleteBus () {
    // TODO: Use Notification Modal
    if (window.confirm(`Delete Bus ${this.props.bus_name}?`)) {
      try {
        const res = await deleteBus({ id: this.props.id })
        console.log('Deleted Successfully', res)
        this.disconnectedCallback()
      } catch (error) {
        window.alert(error)
      }
    }
  }
}

customElements.define('bus-entry', BusEntry)
