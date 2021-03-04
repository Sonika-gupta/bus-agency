class DefaultButton extends HTMLElement {
  render () {
    const template = document.createElement('template')
    template.innerHTML = `
        <button
            type="${this.getAttribute('type')}">
            ${this.getAttribute('text')}
        </button>
        <style>
        button {
            background-color: white;
            box-sizing: border-box;
            border: 1px solid #ddd;
            box-shadow: 0px 1px 2px 0px #ddd;
            padding: 6px 0px;
            outline: none;
            border-radius: 6px;
            width: 100px;
            cursor: pointer;
          }
          button:hover {
              box-shadow: 1px 1px 3px -1px #666;
          }
        </style>
        `
    const component = template.content.cloneNode(true)
    component.querySelector('button').onclick = this.clickFunction
    this.appendChild(component)
  }

  connectedCallback () {
    this.render()
  }
}

customElements.define('default-button', DefaultButton)
