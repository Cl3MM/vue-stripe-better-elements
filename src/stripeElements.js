/* eslint-disable no-console */
export const Stripe = {
  components: [],
  get(type, key) {
    return this.components.find(i => i.type === type && i.key === key)
  }
}

export const baseStyle = {
  base: {
    color: "#32325d",
    fontFamily: "Roboto",
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
}

function init(elementType, key, stripeOptions = {}) {
  const component = Stripe.get(elementType, key) || {
    instance: null,
    type: elementType,
    key: key,
    elements: null,
    element: null
  }

  if (typeof key === "object" && typeof key.elements === "function") {
    component.instance = key
  }

  if (window.Stripe === undefined && component.instance === null) {
    console.error("Stripe V3 library not loaded!")
  } else if (component.instance === null) {
    component.instance = window.Stripe(key)
  }

  if (!component.instance.elements) {
    console.error("Stripe V3 library not loaded!")
  }

  return component
}

export function create({
  elementType,
  stripeKey,
  stripeOptions = {},
  options = {}
) {
  let component = init(elementType, stripeKey)
  const elements = component.instance.elements(options)

  options.style = Object.assign(baseStyle, options.style || {})

  component = Object.assign({}, component, {
    elements,
    element: elements.create(elementType, stripeOptions),
    createToken: options =>
      component.instance.createToken(component.element, options),
    createSource: options =>
      component.instance.createSource(component.element, options),
    retrieveSource: options => component.instance.retrieveSource(options)
  })

  Stripe.components.push(component)

  return component
}

export function destroy(type, key) {
  const idx = Stripe.components.findIndex(i => i.type === type && i.key === key)
  if (idx > -1) {
    Stripe.components = [
      ...Stripe.components.slice(0, idx),
      ...Stripe.components.slice(idx + 1)
    ]
  }
}

export function destroyAll() {
  Stripe.components = {}
}
