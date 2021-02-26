import { newBus } from "./app.js";

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="/styles/form.css" />
<form name="addBus">
  <div class="fieldset">
    <div class="field small">
      <label for="bus_number">Bus number</label>
      <input type="text" id="busNumber" name="bus_number" required />
    </div>
    <div class="field">
      <label for="bus_name">Bus name</label>
      <input type="text" name="bus_name" required />
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
      <input type="text" name="source" value="Delhi" required />
    </div>
    <div class="field">
      <label for="destination">Destination</label>
      <input type="text" name="destination" value="Dehradun" required />
    </div>
  </div>
  <div class="fieldset">
    <div class="field">
      <label for="depart_time">Departure</label>
      <input type="time" name="depart_time" value="00:00" required />
    </div>
    <div class="field">
      <label for="arrival_time">Arrival</label>
      <input type="time" name="arrival_time" value="00:00" required />
    </div>
    <div class="field">
      <label>Duration</label>
      <input id="duration" readonly />
    </div>
  </div>
  <div class="fieldset">
    <div class="field small">
      <label>Seat fare</label>
      <input type="number" name="seat_fare" min="0" required />
    </div>
    <div class="field small">
      <label>Sleeper fare</label>
      <input type="number" name="sleeper_fare" min="0" required />
    </div>
    <div class="field small">
      <label>Agent's Seat fare</label>
      <input type="number" name="agentSeat_fare" min="0" required />
    </div>
    <div class="field small">
      <label>Agent's Sleeper fare</label>
      <input type="number" name="agentSleeper_fare" min="0" required />
    </div>
  </div>
  <div class="fieldset">
    <div class="field">
      <label>Running Days</label>
      <input
        type="checkbox"
        name="running_days"
        id="allDays"
        class="selectAll"
        value="all"
      />
      <label class="checkbox-label" for="allDays">All</label>
      <input
        type="checkbox"
        name="running_days"
        value="monday"
        id="weekday-mon"
      />
      <label class="checkbox-label" for="weekday-mon">M</label>
      <input
        type="checkbox"
        name="running_days"
        value="tuesday"
        id="weekday-tue"
      />
      <label class="checkbox-label" for="weekday-tue">T</label>
      <input
        type="checkbox"
        name="running_days"
        value="wednesday"
        id="weekday-wed"
      />
      <label class="checkbox-label" for="weekday-wed">W</label>
      <input
        type="checkbox"
        name="running_days"
        value="thursday"
        id="weekday-thu"
      />
      <label class="checkbox-label" for="weekday-thu">T</label>
      <input
        type="checkbox"
        name="running_days"
        value="friday"
        id="weekday-fri"
      />
      <label class="checkbox-label" for="weekday-fri">F</label>
      <input
        type="checkbox"
        name="running_days"
        value="saturday"
        id="weekday-sat"
      />
      <label class="checkbox-label" for="weekday-sat">S</label>
      <input
        type="checkbox"
        name="running_days"
        value="sunday"
        id="weekday-sun"
      />
      <label class="checkbox-label" for="weekday-sun">S</label>
    </div>
  </div>
  <div class="fieldset">
    <div class="field">
      <label>Amenities</label>
      <input
        name="amenities"
        id="allAmenities"
        class="selectAll"
        type="checkbox"
        value="all"
      />
      <label class="checkbox-label" for="allAmenities"> All </label>
      <input
        type="checkbox"
        id="water_bottle"
        name="amenities"
        value="water_bottle"
      />
      <label class="checkbox-label" for="water_bottle">
        Water Bottle
      </label>
      <input type="checkbox" id="snacks" name="amenities" value="snacks" />
      <label class="checkbox-label" for="snacks"> Snacks </label>
      <input
        type="checkbox"
        id="blanket"
        name="amenities"
        value="blanket"
      />
      <label class="checkbox-label" for="blanket"> Blanket </label>
      <input type="checkbox" id="toilet" name="amenities" value="toilet" />
      <label class="checkbox-label" for="toilet"> Toilet </label>
      <input
        type="checkbox"
        id="charging_points"
        name="amenities"
        value="charging_points"
      />
      <label class="checkbox-label" for="charging_points">
        Charging point
      </label>
      <input type="checkbox" id="movie" name="amenities" value="movie" />
      <label class="checkbox-label" for="movie"> Movie </label>
      <input
        type="checkbox"
        id="track_my_bus"
        name="amenities"
        value="track_my_bus"
      />
      <label class="checkbox-label" for="track_my_bus"> Bus Tracker </label>
      <input
        type="checkbox"
        id="emergency_contact"
        name="amenities"
        value="emergency_contact"
      />
      <label class="checkbox-label" for="emergency_contact">
        Emergency Contact
      </label>
      <input
        type="checkbox"
        id="reschedulable"
        name="amenities"
        value="reschedulable"
      />
      <label class="checkbox-label" for="reschedulable">
        Reschedulable
      </label>
      <input
        type="checkbox"
        id="liveTracking"
        name="amenities"
        value="liveTracking"
      />
      <label class="checkbox-label" for="liveTracking">
        Live Tracking
      </label>
    </div>
  </div>
  <div class="submit">
    <default-button text="Add"></default-button>
  </div>
</form>
`;
class BusForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const busForm = this.shadowRoot.querySelector('form[name = "addBus"]');
    busForm.addEventListener("submit", this.handleSubmit);
    this.addSelectAllEvents();
    /* const allDaysSelector = this.shadowRoot.getElementById('all-days')
    const daySelectors = this.shadowRoot.querySelectorAll('input[name="running_days"]')
    daySelectors.forEach(checkbox => {
      checkbox.onclick = () => {
        this.checked ?
      }
    }
    .onclick = selectall

    function selectall() {
      console.log(daySelectors)
      for (var checkbox of daySelectors) {
        checkbox.checked = this.checked
      }
    } */
  }

  connectedCallback() {
    this.render();
    console.log("Bus Form is connected!");
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("handle submit", e.target.action);
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    value.amenities = data.getAll("amenities");
    value.running_days = data.getAll("running_days");
    console.log(value);
    newBus(value).then((result) => {
      console.log(result);
    });
  }

  addSelectAllEvents() {
    const selectAll = this.shadowRoot.querySelectorAll(".selectAll");
    selectAll.forEach((selector) => {
      selector.parentNode.addEventListener("click", function (event) {
        const checkboxes = this.querySelectorAll('input[type="checkbox"]:not(.selectAll)')
        const clicked = event.target
        console.log(checkboxes)
        if(clicked.className === 'selectAll') {
          checkboxes.forEach(checkbox => checkbox.checked = selector.checked)
        }
        else {
          const isAll = Array.from(checkboxes).reduce((checked, checkbox) => checked && checkbox.checked)
          console.log(isAll)
          selector.checked = isAll
        }
      });
    });
  }
}
customElements.define("bus-form", BusForm);
