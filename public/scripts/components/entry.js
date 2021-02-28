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
          <i id="editBusButton" class="fa fa-edit" onclick=this.getRootNode().host.editBus()></i>
          <i id="deleteBusButton" class="fa fa-trash-o" onclick=this.getRootNode().host.deleteBus()></i>
        </div>
        <!-- <default-button id="viewSeatsButton" text="View Seats"></default-button> -->
      </div>
    </div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.render()
    console.log('Entry is connected!')
  }

  editBus () {
    const editEntry = new CustomEvent('edit', {
      bubbles: true,
      detail: this.props
    })
    this.dispatchEvent(editEntry)
  }

  deleteBus () {
    // TODO: Use Notification Modal
    if (window.confirm(`Delete Bus ${this.props.bus_name}?`)) {
      deleteBus({ id: this.props.id }).then((response) => {
        if (response.error) window.alert(response.error)
        else {
          console.log('Deleted Successfully')
          const deleteEntry = new CustomEvent('delete', { bubbles: true })
          this.dispatchEvent(deleteEntry)
        }
      })
    }
  }
}
customElements.define('bus-entry', BusEntry)
