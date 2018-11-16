import "./lib"
import { Stripe, baseStyle } from "./stripeElements"
import StripeElement from "./StripeElement"

module.exports = {
  StripeElement,
  baseStyle,
  get Stripe() {
    return Stripe
  },
  get instance() {
    return Stripe.instance
  },
  get components() {
    return Stripe.components
  },
  get get() {
    return Stripe.get
  }
}
