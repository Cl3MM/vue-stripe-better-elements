<template>
  <div class="container">
    <!-- stripe Iban element -->
    <stripe-element
      type="iban"
      :stripe="stripeKey"
      :elOptions="ibanOptions"
      @change="ibcompleted = $event.complete"
    />

    <!-- stripe Card element -->
    <stripe-element
      type="card"
      :stripe="stripeKey"
      :elsOptions="elsOptions"
      @change="cdcompleted = $event.complete"
    />
    <div class="buttons has-addons is-centered">
      <button class="button is-info" :disabled="!cdcompleted" @click="payByCard">Pay by Card</button>
      <button class="button is-info" :disabled="!ibcompleted" @click="payByIban">Pay by IBAN</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { StripeElement, Stripe } from "../../../src/index";

export default {
  name: "NoSlots",
  components: {
    StripeElement
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ["stripeKey"],
  data: () => ({
    elsOptions: {
      locale: "de"
    },
    ibanOptions: {
      supportedCountries: [`SEPA`],
      placeholderCountry: `DE`
    },
    ibcompleted: false,
    cdcompleted: false
  }),
  methods: {
    payByIban() {
      Stripe.get("iban", this.stripeKey)
        .createSource({
          type: "sepa_debit",
          currency: "eur",
          owner: {
            name: "foobar",
            email: "foo@bar.com"
          },
          mandate: {
            notification_method: "email"
          }
        })
        .then(console.log)
        .catch(console.error);
    },
    payByCard() {
      Stripe.get("card", this.stripeKey)
        .createToken()
        .then(console.log)
        .catch(console.error);
    }
  }
};
</script>