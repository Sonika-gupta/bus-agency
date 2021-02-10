const template = document.createElement('template')
template.innerHTML = `
<div class="bus-item">
  <div class="bus-item-details">
    <div class="row">
      <div class="column">
        <slot name="bus_number" class="bus-number"></slot>
        <slot name="name" class="bus-name"></slot>
        <slot name="busType class="bus-type"></slot>
      </div>
      <div class="column">
        <slot name="departureTime" class="dp-time"></slot>
        <slot name="source" class="dp-loc"></slot>
      </div>
      <div class="column">
        <slot name="duration" class="dur"></slot>
      </div>
      <div class="column">
        <div class="bp-time"></div>
        <div class="next-day-dp-lbl"></div>
        <div class="bp-loc"></div>
      </div>
      <div class="column">
        <div class="seat-fare ">
            <div class="fare">₹ <span slot="seatFare" class="price"></span></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="amenities-icon">
        <ul>
          <li><i class="icon"></i> <span></span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="button view-seats">View Seats</div>
  <div>
    <ul class="bottom-panel">
      <li class="amenties-list"><span>Amenities</span></li>
      <li class="amenties-list"><span>Bus Photos</span></li>
      <li class="amenties-list"><span>Boarding &amp; Dropping Points</span></li>
      <li class="amenties-list"><span>Reviews</span></li>
      <li class="amenties-list"><span>Booking policies</span></li>
    </ul>
  </div>
</div>`
export default class BusEntry extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' });

  }
  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('#number').innerText = this.getAttribute('number')
    this.shadowRoot.querySelector('#name').innerText = this.getAttribute('name')
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
    this.render()
    console.log('Bus Entry is connected!')
  }
}
customElements.define('bus-entry', BusEntry)