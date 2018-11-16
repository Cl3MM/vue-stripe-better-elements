<template>
  <div class="container">
    <!-- stripe Iban element -->
    <stripe-element
      type="iban"
      :options="ibanOptions"
      :stripe="stripeKey"
      @change="ibcompleted = $event.complete"
    />

    <!-- stripe Card element -->
    <stripe-element
      type="card"
      :stripe="stripeKey"
      @change="cdcompleted = $event.complete"
    />

    <button
      class="button is-info"
      :disabled="!cdcompleted"
      @click="payByCard"
    >Pay by Card</button>
    <button
      class="button is-info"
      :disabled="!ibcompleted"
      @click="payByIban"
    >Pay by IBAN</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { StripeElement, Stripe } from "vue-stripe-better-elements"

export default {
  name: 'NoSlots',
  components: {
    StripeElement
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['stripeKey'],
  data: () => ({
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
          type: "sepa_debit"
        })
        .then(console.log)
        .catch(console.error)
    },
    payByCard() {
      Stripe.get("card", this.stripeKey)
        .createToken()
        .then(console.log)
        .catch(console.error)
    }
  }
}
</script>