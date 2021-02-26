import { calcDuration } from './utils.js'
class BusEntry extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.props = {
      bus_number: 0,
      bus_name: '',
      source: 'delhi',
      destination: 'delhi',
      depart_time: '',
      arrival_time: '',
      chart: '35-seater',
      running_days: [],
      last_modified: '',
      seat_fare: 0,
      sleeper_fare: 0,
      agent_seat_fare: 0,
      agent_sleeper_fare: 0
    }
  }

  render () {
    const template = document.createElement('template')
    template.innerHTML = `
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
        <div>INR <span class="price emphasis">${this.props.seat_fare} /-</span></div>
        <default-button id="viewSeatsButton" text="View Seats"></default-button>
      </div>
    </div>
    `
    // this.calculateDuration()
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.render()
    console.log('Entry is connected!')
  }

/*   calculateDuration () {
    return '00:00'
    // calcDuration(this.depart_time, this.arrival_time)
  } */
}
customElements.define('bus-entry', BusEntry)
