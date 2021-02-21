import { newBus } from "./app.js";

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="/styles/form.css" />
<form name="addBus">
  <fieldset>
    <div class="field">
      <label for="busNumber">Bus number</label>
      <input type="text" name="busNumber" />
    </div>
    <div class="field">
      <label for="name">Bus name</label>
      <input type="text" name="busName" />
    </div>
  </fieldset>
  <fieldset>
    <label for="busType">Bus Type</label>
    <select name="busType">
      <option value="non-AC seater">Non-AC Seater</option>
      <option value="non-AC seater sleeper">Non-AC Seater Sleeper</option>
      <option value="AC seater sleeper">AC Seater Sleeper</option>
      <option value="volvo">Volvo</option>
    </select>
    <label for="chart">Bus Chart</label>
    <select name="chart">
      <option value="35-seater">35 Seater</option>
      <option value="45-seater">45 Seater</option>
    </select>
  </fieldset>
  <fieldset>
    <div class="field">
      <label for="source">Source</label>
      <input type="text" name="source" value="Delhi" />
    </div>
    <div class="field">
      <label for="destination">Destination</label>
      <input type="text" name="destination" value="Dehradun" />
    </div>
  </fieldset>
  <fieldset>
    <div>
      <label for="departTime">Departure</label>
      <input type="time" name="departTime" value="00:00" />
      <label for="arrivalTime">Arrival</label>
      <input type="time" name="arrivalTime" value="00:00" />
    </div>
    <div>
      <label>Duration</label>
      <span id="duration"></span>
    </div>
  </fieldset>
  <fieldset>
    <label>Running Days</label>
    <div class="weekDays-selector">
      <!--
      <input
        type="checkbox"
        name="runningDays"
        value="all"
        id="all-days"
        class="weekday"
      />
      <label for="all-days">All</label>
      -->
      <input
        type="checkbox"
        name="runningDays"
        value="monday"
        id="weekday-mon"
        class="weekday"
      />
      <label for="weekday-mon">M</label>
      <input
        type="checkbox"
        name="runningDays"
        value="monday"
        id="weekday-mon"
        class="weekday"
      />
      <label for="weekday-mon">M</label>
      <input
        type="checkbox"
        name="runningDays"
        value="tuesday"
        id="weekday-tue"
        class="weekday"
      />
      <label for="weekday-tue">T</label>
      <input
        type="checkbox"
        name="runningDays"
        value="wednesday"
        id="weekday-wed"
        class="weekday"
      />
      <label for="weekday-wed">W</label>
      <input
        type="checkbox"
        name="runningDays"
        value="thursday"
        id="weekday-thu"
        class="weekday"
      />
      <label for="weekday-thu">T</label>
      <input
        type="checkbox"
        name="runningDays"
        value="friday"
        id="weekday-fri"
        class="weekday"
      />
      <label for="weekday-fri">F</label>
      <input
        type="checkbox"
        name="runningDays"
        value="saturday"
        id="weekday-sat"
        class="weekday"
      />
      <label for="weekday-sat">S</label>
      <input
        type="checkbox"
        name="runningDays"
        value="sunday"
        id="weekday-sun"
        class="weekday"
      />
      <label for="weekday-sun">S</label>
    </div>
  </fieldset>
  <fieldset>
    <label>Seat fare</label>
    <input type="number" name="seatFare" min="0" />
    <label>Sleeper fare</label>
    <input type="number" name="sleeperFare" min="0" />
    <label>Agent Seat fare</label>
    <input type="number" name="agentSeatFare" min="0" />
    <label>Agent Sleeper fare</label>
    <input type="number" name="agentSleeperFare" min="0" />
  </fieldset>
  <fieldset>
    <label>Amenities</label>
    <input type="checkbox" name="amenities" value="blanket" />
    <label for="blanket"> Blanket </label><br />
    <input type="checkbox" name="amenities" value="water_bottle" />
    <label for="water_bottle"> Water Bottle </label><br />
    <input type="checkbox" name="amenities" value="snacks" />
    <label for="snacks"> Snacks </label><br />
    <input type="checkbox" name="amenities" value="charging_points" />
    <label for="charging_points"> Charging point </label><br />
    <input type="checkbox" name="amenities" value="movie" />
    <label for="movie"> Movie </label><br />
    <input type="checkbox" name="amenities" value="track_my_bus" />
    <label for="track_my_bus"> Bus Tracker </label><br />
    <input type="checkbox" name="amenities" value="emergency_contact" />
    <label for="emergency_contact"> Emergency Contact </label><br />
    <input type="checkbox" name="amenities" value="toilet" />
    <label for="toilet"> Toilet </label><br />
    <input type="checkbox" name="amenities" value="reschedulable" />
    <label for="reschedulable"> Reschedulable </label><br />
    <input type="checkbox" name="amenities" value="liveTracking" />
    <label for="liveTracking"> Live Tracking </label><br />
  </fieldset>
  <button id="createNewBusButton">Add</button>
  <!-- "boarding_points": {
          "array": "busStopType"
        },
        "dropping_points": {
            "array": "busStopType"
        }, -->
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
    /* const allDaysSelector = this.shadowRoot.getElementById('all-days')
    const daySelectors = this.shadowRoot.querySelectorAll('input[name="runningDays"]')
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
    console.log('handle submit', e.target.action);
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    value.amenities = data.getAll("amenities");
    value.running_days = data.getAll("runningDays");
    console.log(value)
    newBus(value).then((result) => {
      console.log(result);
    });
  }
}
customElements.define("bus-form", BusForm);
