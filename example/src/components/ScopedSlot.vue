<template>
  <div class="container">
    <!-- stripe Iban element -->
    <stripe-element
      type="iban"
      :stripe="stripeKey"
      :elOptions="ibanOptions"
      @change="ibcompleted = $event.complete"
    >
      <template slot-scope="slotProps">
        <button
          class="button is-info"
          :disabled="!ibcompleted"
          @click="payByIban(slotProps.elements)"
        >Pay by IBAN</button>
      </template>
    </stripe-element>

    <!-- stripe Card element -->
    <stripe-element type="card" :stripe="stripeKey" @change="cdcompleted = $event.complete">
      <template slot-scope="slotProps">
        <button
          class="button is-info"
          :disabled="!cdcompleted"
          @click="payByCard(slotProps)"
        >Pay by Card</button>
      </template>
    </stripe-element>
  </div>
</template>

<script>
/* eslint-disable no-console */
// import { StripeElement } from "vue-stripe-better-elements"
import { StripeElement } from "../../../src/index.js";

export default {
  name: "ScopedSlotz",
  // eslint-disable-next-line vue/require-prop-types
  props: ["stripeKey"],
  components: {
    StripeElement
  },
  data: () => ({
    ibanOptions: {
      supportedCountries: [`SEPA`],
      placeholderCountry: `DE`
    },
    ibcompleted: false,
    cdcompleted: false
  }),
  methods: {
    payByIban({ createSource }) {
      createSource({
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
    payByCard(slotProps) {
      slotProps.elements
        .createToken()
        .then(console.log)
        .catch(console.error);
    }
  }
};
</script>