import { createApp } from 'vue'

import CardApp from './Card.vue'


import ComponentRegistry from '../componentregistry'
import Component from '../Component'

@ComponentRegistry.registerComponent('[data-component="custom-card-component"]')
export class Card extends Component {
  private app

  declare data: {
    label: string
    description: string
  }

  constructor(el) {
    super(el)

    const props = {
      label: this.data.label,
      description: this.data.description,
    }

    this.app = createApp(CardApp, props)
    this.app.mount(this.el.querySelector('.card-app') as HTMLElement)
  }
}
