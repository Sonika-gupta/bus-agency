class BusEntry extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const template = document.createElement("template");
    template.innerHTML = `
    <link rel="stylesheet" href="/styles/entry.css" />
    <div class="item">
      <div class="details col">
        <span>${this.number}</span>
        <span class="emphasis">${this.name}</span>
        <slot name="busType"></slot>
      </div>
      <div class="panel">
        <div class="stop-location col">
          <span class="emphasis">${this.departTime}</span>
          <span>${this.source}</span>
        </div>
        <div class="duration col">
          ${Date.parse(this.arrivalTime) - Date.parse(this.departTime)}
        </div>
        <div class="stop-location col">
          <span class="emphasis">${this.arrivalTime}</span>
          <span>${this.destination}</span>
        </div>
      </div>
      <div class="action col">
        <div>INR <span class="price emphasis">${this.seatFare} /-</span></div>
        <button id="viewSeatsButton">View Seats</button>
      </div>
    </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // this.shadowRoot.querySelector('#number').innerText = this.getAttribute('number')
  }
  connectedCallback() {
    this.render();
    console.log("Entry is connected!", this.arrivalTime);
  }
}
customElements.define("bus-entry", BusEntry);
