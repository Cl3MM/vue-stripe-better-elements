<template>
  <div>
    <slot
      :element="element"
      :elements="elements"
    />
  </div>
</template>

<script>
import props from './props'
import { create, destroy } from './stripeElements'

export default {
  props,

  beforeMount () {
    this.elements = create(this.type, this.stripe, this.options)
    this.element = this.elements.element

    this.element.on('blur', () => this.$emit('blur'))
    this.element.on('focus', () => this.$emit('focus'))
    this.element.on('change', event => this.$emit('change', event))
  },

  beforeDestroy () {
    this.element.unmount()
    this.element.destroy()
    destroy(this.type, this.stripe)
  },

  mounted () {
    // Vue likes to stay in control of $el but Stripe needs a real element
    const el = document.createElement('div')
    this.element.mount(el)
    // this.$children cannot be used because it expects a VNode :(
    this.$el.prepend(el)
  },

  methods: {
    blur () { this.element.blur() },
    clear () { this.element.clear() },
    focus () { this.element.focus() },
    update (opts) { this.element.update(opts) }
  }
}
</script>