export { default as AlertGlobal } from '../..\\components\\AlertGlobal.vue'
export { default as MenuBar } from '../..\\components\\MenuBar.vue'
export { default as ModalDeleteConfirm } from '../..\\components\\ModalDeleteConfirm.vue'
export { default as TaskModalAddTask } from '../..\\components\\task\\ModalAddTask.vue'
export { default as TaskModalInfoTask } from '../..\\components\\task\\ModalInfoTask.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
