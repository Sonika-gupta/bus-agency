import { calcDuration } from '../utils.js'

class BusForm extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  render () {
    // TODO: Provide values to template through javascript
    const template = document.createElement('template')
    template.innerHTML = `
      <link rel="stylesheet" href="/styles/form.css" />
      <form>
        <div class="fieldset">
          <div class="field small">
            <label for="bus_number">Bus number</label>
            <input type="text" id="busNumber" name="bus_number" value='' required />
          </div>
          <div class="field">
            <label for="bus_name">Bus name</label>
            <input type="text" name="bus_name" value='' required />
          </div>
        </div>
        <div class="fieldset">
          <div class="field">
            <label for="bus_type">Bus Type</label>
            <select name="bus_type">
              <option value="non-AC seater">Non-AC Seater</option>
              <option value="non-AC seater sleeper">Non-AC Seater Sleeper</option>
              <option value="AC seater sleeper">AC Seater Sleeper</option>
              <option value="volvo">Volvo</option>
            </select>
          </div>
          <div class="field">
            <label for="chart">Bus Chart</label>
            <select name="chart">
              <option value="35-seater">35 Seater</option>
              <option value="45-seater">45 Seater</option>
            </select>
          </div>
        </div>
        <div class="fieldset">
          <div class="field">
            <label for="source">Source</label>
            <input type="text" name="source" value='Delhi' required />
          </div>
          <div class="field">
            <label for="destination">Destination</label>
            <input type="text" name="destination" value='Dehradun' required />
          </div>
        </div>
        <div class="fieldset">
          <div class="field">
            <label for="depart_time">Departure</label>
            <input type="time" name="depart_time" value='00:00' required />
          </div>
          <div class="field">
            <label for="arrival_time">Arrival</label>
            <input type="time" name="arrival_time" value='00:00' required />
          </div>
          <div class="field">
            <label>Duration</label>
            <input id="duration" readonly />
          </div>
        </div>
        <div class="fieldset">
          <div class="field small">
            <label>Seat fare</label>
            <input type="number" name="seat_fare" min="0" value= 0 required />
          </div>
          <div class="field small">
            <label>Sleeper fare</label>
            <input type="number" name="sleeper_fare" min="0" value= 0 required />
          </div>
          <div class="field small">
            <label>Agent's Seat fare</label>
            <input type="number" name="agent_seat_fare" min="0" value= 0 required />
          </div>
          <div class="field small">
            <label>Agent's Sleeper fare</label>
            <input type="number" name="agent_sleeper_fare" min="0" value= 0 required />
          </div>
        </div>
        <div class="fieldset">
          <div class="field">
            <label>Running Days</label>
            <input type="checkbox" id="allDays" class="selectAll" value="all" />
            <label class="checkbox-label" for="allDays">All</label>
            <input type="checkbox" name="running_days" value="monday" id="weekday-mon" />
            <label class="checkbox-label" for="weekday-mon">M</label>
            <input type="checkbox" name="running_days" value="tuesday" id="weekday-tue" />
            <label class="checkbox-label" for="weekday-tue">T</label>
            <input type="checkbox" name="running_days" value="wednesday" id="weekday-wed" />
            <label class="checkbox-label" for="weekday-wed">W</label>
            <input type="checkbox" name="running_days" value="thursday" id="weekday-thu" />
            <label class="checkbox-label" for="weekday-thu">T</label>
            <input type="checkbox" name="running_days" value="friday" id="weekday-fri" />
            <label class="checkbox-label" for="weekday-fri">F</label>
            <input type="checkbox" name="running_days" value="saturday" id="weekday-sat" />
            <label class="checkbox-label" for="weekday-sat">S</label>
            <input type="checkbox" name="running_days" value="sunday" id="weekday-sun" />
            <label class="checkbox-label" for="weekday-sun">S</label>
          </div>
        </div>
        <div class="fieldset">
          <div class="field">
            <label>Amenities</label>
            <input id="allAmenities" class="selectAll" type="checkbox" value="all" />
            <label class="checkbox-label" for="allAmenities"> All </label>
            <input type="checkbox" id="water_bottle" name="amenities" value="water_bottle" />
            <label class="checkbox-label" for="water_bottle"> Water Bottle </label>
            <input type="checkbox" id="snacks" name="amenities" value="snacks" />
            <label class="checkbox-label" for="snacks"> Snacks </label>
            <input type="checkbox" id="blanket" name="amenities" value="blanket" />
            <label class="checkbox-label" for="blanket"> Blanket </label>
            <input type="checkbox" id="toilet" name="amenities" value="toilet" />
            <label class="checkbox-label" for="toilet"> Toilet </label>
            <input type="checkbox" id="charging_points" name="amenities" value="charging_points" />
            <label class="checkbox-label" for="charging_points"> Charging point </label>
            <input type="checkbox" id="movie" name="amenities" value="movie" />
            <label class="checkbox-label" for="movie"> Movie </label>
            <input type="checkbox" id="track_my_bus" name="amenities" value="track_my_bus" />
            <label class="checkbox-label" for="track_my_bus"> Bus Tracker </label>
            <input type="checkbox" id="emergency_contact" name="amenities" value="emergency_contact" />
            <label class="checkbox-label" for="emergency_contact"> Emergency Contact </label>
            <input type="checkbox" id="reschedulable" name="amenities" value="reschedulable" />
            <label class="checkbox-label" for="reschedulable"> Reschedulable </label>
            <input type="checkbox" id="liveTracking" name="amenities" value="liveTracking" />
            <label class="checkbox-label" for="liveTracking"> Live Tracking </label>
          </div>
        </div>
        <div class="submit">
          <default-button id="addBusButton" text="Save" type="submit"></default-button>
        </div>
      </form>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const busForm = this.shadowRoot.querySelector('form')
    busForm.addEventListener('submit', (e) => {
      e.preventDefault()
      this.handleSubmit(busForm)
    })
    this.feedData()
    this.addSelectAllEvents()
    this.addDuration()
  }

  connectedCallback () {
    this.render()
    console.log('Bus Form is connected!')
  }

  feedData () {
    this.shadowRoot.querySelectorAll('input:not([type="checkbox"]').forEach(input => {
      input.value = this.data[input.name] || input.value
    })
    if (this.data.running_days) {
      this.shadowRoot.querySelectorAll('input[name="running_days"]').forEach(checkbox => {
        if (this.data.running_days.includes(checkbox.value)) checkbox.checked = true
      })
    }
    if (this.data.amenities) {
      this.shadowRoot.querySelectorAll('input[name="amenities"]').forEach(checkbox => {
        if (this.data.amenities.includes(checkbox.id)) checkbox.checked = true
      })
    }
  }

  async handleSubmit (form) {
    const data = new FormData(form)
    const value = Object.fromEntries(data.entries())
    value.amenities = data.getAll('amenities')
    value.running_days = data.getAll('running_days')
    Object.assign(this.data, value)

    try {
      await this.submit(this.data)
    } catch (err) {
      console.log(err)
      window.alert('Error In Submitting')
    }
  }

  addSelectAllEvents () {
    const selectAll = this.shadowRoot.querySelectorAll('.selectAll')
    selectAll.forEach((selector) => {
      selector.parentNode.addEventListener('change', function (event) {
        const checkboxes = this.querySelectorAll('input[type="checkbox"]:not(.selectAll)')
        const clicked = event.target
        if (clicked.className === 'selectAll') {
          checkboxes.forEach(checkbox => (checkbox.checked = selector.checked))
        } else {
          const isAllChecked = Array.from(checkboxes).reduce((checked, checkbox) => checked && checkbox.checked, true)
          selector.checked = isAllChecked
        }
      })
    })
  }

  addDuration () {
    // TODO: Give duration options with 24-hour-interval
    const duration = this.shadowRoot.querySelector('#duration')
    const timeInputs = this.shadowRoot.querySelectorAll('input[type="time"]')
    timeInputs.forEach((input) => {
      input.addEventListener('change', () => {
        duration.value = calcDuration(
          ...Array.from(timeInputs).map((input) => input.value)
        )
      })
    })
  }
}

customElements.define('bus-form', BusForm)
