let GUID = 0
class Component {
    el: HTMLElement
    data: {}
    originalClasses: string[]
    SELECTOR: string
    GUID: number

    $refs: any

    constructor (el: HTMLElement) {
        this.GUID = GUID++
        this.el = el
        this.data = {...el.dataset}
        this.$refs = {}
    }
}

export default Component
