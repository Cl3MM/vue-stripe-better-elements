import "./lib";
import { Stripe, baseStyle } from "./stripeElements";
import StripeElement from "./StripeElement";

export { Stripe, baseStyle } from "./stripeElements";
export { default as StripeElement } from "./StripeElement";

export const instance = Stripe.instance;
export const components = Stripe.components;
export const get = Stripe.get;

export default {
  StripeElement,
  baseStyle,
  get Stripe() {
    return Stripe;
  },
  get instance() {
    return Stripe.instance;
  },
  get components() {
    return Stripe.components;
  },
  get get() {
    return Stripe.get;
  }
};
