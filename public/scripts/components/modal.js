class CustomModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  render () {
    const template = document.createElement('template')
    template.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <div class="close">&times;</div>
                <slot name="content"></slot>
            </div>
        </div>
        <style>
          .modal {
            display: flex;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0 0 0 / 60%);
          }
          .modal-content {
            background-color: #fff;
            margin: auto;
            box-shadow: 0px 0px 3px 0px #eee;
            border-radius: 4px;
            overflow: hidden;
            padding: 25px 20px;
            position: relative;
          }
          .close {
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            padding: 9px 17px;
            color: #706f6f;
          }
        </style>
        `
    const component = template.content.cloneNode(true)
    this.shadowRoot.appendChild(component)
    this.addEventListener('close', this.disconnectedCallback)
    this.addCloseEvents()
  }

  addCloseEvents () {
    this.shadowRoot.querySelector('.close').onclick = () => this.disconnectedCallback()
  }

  connectedCallback () {
    this.render()
    this.content.slot = 'content'
    this.appendChild(this.content)
  }

  disconnectedCallback () {
    this.remove()
  }
}

customElements.define('custom-modal', CustomModal)
