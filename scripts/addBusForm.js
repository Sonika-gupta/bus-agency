import { newBus } from "./app.js";

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="/styles/form.css" />
<form name="addBus">
  <fieldset>
    <div class="field">
      <label for="bus_number">Bus number</label>
      <input type="text" id="busNumber" name="bus_number" required/>
    </div>
    <div class="field">
      <label for="bus_name">Bus name</label>
      <input type="text" name="bus_name" required/>
    </div>
  </fieldset>
  <fieldset>
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
  </fieldset>
  <fieldset>
    <div class="field">
      <label for="source">Source</label>
      <input type="text" name="source" value="Delhi" required/>
    </div>
    <div class="field">
      <label for="destination">Destination</label>
      <input type="text" name="destination" value="Dehradun" required/>
    </div>
  </fieldset>
  <fieldset>
    <div class="field">
      <label for="depart_time">Departure</label>
      <input type="time" name="depart_time" value="00:00" required/>
    </div>
    <div class="field">
      <label for="arrival_time">Arrival</label>
      <input type="time" name="arrival_time" value="00:00" required/>
    </div>
    <div class="field">
      <label>Duration</label>
      <span id="duration"></span>
    </div>
  </fieldset>
  <fieldset>
    <div class="field">
      <label>Seat fare</label>
      <input type="number" name="seat_fare" min="0" required/>
    </div>
    <div class="field">
      <label>Sleeper fare</label>
      <input type="number" name="sleeper_fare" min="0" required/>
    </div>
  </fieldset>
  <fieldset>
    <legend>Agent's Fare</legend>
    <div class="field">
      <label>Seat fare</label>
      <input type="number" name="agentSeat_fare" min="0" required/>
    </div>
    <div class="field">
      <label>Sleeper fare</label>
      <input type="number" name="agentSleeper_fare" min="0" required/>
    </div>
  </fieldset>
  <fieldset>
    <legend>Running Days</legend>
    <div class="weekDays-selector">
      <!--
      <input
        type="checkbox"
        name="running_days"
        value="all"
        id="all-days"
        class="weekday"
      />
      <label for="all-days">All</label>
      -->
      <input
        type="checkbox"
        name="running_days"
        value="monday"
        id="weekday-mon"
        class="weekday"
      />
      <label for="weekday-mon">M</label>
      <input
        type="checkbox"
        name="running_days"
        value="tuesday"
        id="weekday-tue"
        class="weekday"
      />
      <label for="weekday-tue">T</label>
      <input
        type="checkbox"
        name="running_days"
        value="wednesday"
        id="weekday-wed"
        class="weekday"
      />
      <label for="weekday-wed">W</label>
      <input
        type="checkbox"
        name="running_days"
        value="thursday"
        id="weekday-thu"
        class="weekday"
      />
      <label for="weekday-thu">T</label>
      <input
        type="checkbox"
        name="running_days"
        value="friday"
        id="weekday-fri"
        class="weekday"
      />
      <label for="weekday-fri">F</label>
      <input
        type="checkbox"
        name="running_days"
        value="saturday"
        id="weekday-sat"
        class="weekday"
      />
      <label for="weekday-sat">S</label>
      <input
        type="checkbox"
        name="running_days"
        value="sunday"
        id="weekday-sun"
        class="weekday"
      />
      <label for="weekday-sun">S</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Amenities</legend>
    <div class="field">    
      <input type="checkbox" name="amenities" value="water_bottle" />
      <label for="water_bottle"> Water Bottle </label><br />
    </div>
    <div class="field">
      <input type="checkbox" name="amenities" value="snacks" />
      <label for="snacks"> Snacks </label><br />
    </div>
    <div class="field">
      <input type="checkbox" name="amenities" value="blanket" />
      <label for="blanket"> Blanket </label><br />
    </div>
    <div class="field">
      <input type="checkbox" name="amenities" value="toilet" />
      <label for="toilet"> Toilet </label><br />
    </div>
    <div class="field">
      <input type="checkbox" name="amenities" value="charging_points" />
      <label for="charging_points"> Charging point </label><br />
    </div>
    <div class="field">
      <input type="checkbox" name="amenities" value="movie" />
      <label for="movie"> Movie </label><br />
    </div>
    <div class="field">
      <input type="checkbox" name="amenities" value="track_my_bus" />
      <label for="track_my_bus"> Bus Tracker </label><br />
    </div>
    <div class="field">
      <input type="checkbox" name="amenities" value="emergency_contact" />
      <label for="emergency_contact"> Emergency Contact </label><br />
    </div>
    <div class="field">
      <input type="checkbox" name="amenities" value="reschedulable" />
      <label for="reschedulable"> Reschedulable </label><br />
    </div>
    <div class="field">
      <input type="checkbox" name="amenities" value="liveTracking" />
      <label for="liveTracking"> Live Tracking </label><br />
    </div>
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
}
customElements.define("bus-form", BusForm);
