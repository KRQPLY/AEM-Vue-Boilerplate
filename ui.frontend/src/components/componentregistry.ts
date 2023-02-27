import Component from './Component'

interface ComponentEntry<T extends Component> { [x: string] : new (el: HTMLElement) => T }

class ComponentRegistry {
  private registredComponents: ComponentEntry<Component>
  private queue: ComponentEntry<Component>
  private startedComponents: {
    selector: string,
    classInstance: Component
  }[]

  constructor () {
    this.registredComponents = {}
    this.queue = {}
    this.startedComponents = []
  }

  private isComponentInQueue (selector: string) {
    return Boolean(selector in this.queue)
  }

  private isComponentRegistred (selector: string) {
    return Boolean(selector in this.registredComponents)
  }

  private canComponentBeRegistred (selector: string) {
    return !this.isComponentInQueue(selector) || !this.isComponentRegistred(selector)
  }

  private startComponent (selector: string, node: HTMLElement) {
    const ComponentClass = this.registredComponents[selector]
    const elements =  Array.from(node.querySelectorAll(selector)) as HTMLElement[]

    elements.forEach(element => {
      const existentComponents = this.startedComponents.filter(startedComponent => startedComponent.classInstance.el === element)

      existentComponents.forEach(componentInstance => {
        componentInstance.classInstance.beforeUnload()
      })

      const classInstance = new ComponentClass(element)
      const startedInstance = {
        selector: selector,
        classInstance
      }


      this.startedComponents.push(startedInstance)
    })
  }

  private observerCallback (selector: string, mutations: MutationRecord[]) {
    mutations.forEach(mutation => {
      const addedNodes = Array.from(mutation.addedNodes) as HTMLElement[]

      addedNodes.forEach(addedNode => {
        if (!addedNode.hasAttribute || !addedNode.querySelectorAll) {
          return
        }

        this.startComponent(selector, addedNode)
      })
    })
  }

  private initComponent (selector: string) {
    const observer = new MutationObserver(this.observerCallback.bind(this, selector))

    this.startComponent(selector, document.body)

    observer.observe(document.body, {
      subtree: true,
      childList: true
    })
  }

  registerComponent<T extends Component> (selector: string) {
    return (ComponentClass: new (el: HTMLElement) => T) => {
      if (!this.canComponentBeRegistred(selector)) {
        throw new Error(`Component with selector ${selector} is already registred or is waiting for registration`)
      }

      this.queue[selector] = ComponentClass

      requestAnimationFrame(() => {
        delete this.queue[selector]

        this.registredComponents[selector] = ComponentClass

        if (document.readyState !== 'loading') {
          this.initComponent(selector)
        } else {
          document.addEventListener('DOMContentLoaded', this.initComponent.bind(this, selector))
        }
      })
    }
  }

  getComponentBySelector (selector: string) {
    return this.registredComponents[selector] || this.queue[selector]
  }

  getStartedComponentsBySelector (selector: string) {
    return this.startedComponents.filter(startedComponent => startedComponent.selector === selector)
  }
}

export default new ComponentRegistry()
