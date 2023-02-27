import { createApp } from 'vue'

import ButtonApp from './Button.vue'

import ComponentRegistry from '../componentregistry'
import Component from '../Component'

@ComponentRegistry.registerComponent(
  '[data-component="custom-button-component"]'
)
export class Button extends Component {
  private app

  declare data: {
    title: string
    bgcolor: string
  }

  constructor(el) {
    super(el)

    const props = {
      title: this.data.title,
      bgcolor: this.data.bgcolor
    }

    this.app = createApp(ButtonApp, props)
    this.app.mount(this.el.querySelector('.button-app') as HTMLElement)
  }
}
