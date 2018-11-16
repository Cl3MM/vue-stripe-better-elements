<template>
<div class="container">
  <!-- stripe Iban element -->
  <stripe-element
    type="iban"
    :stripe="stripeKey"
    :options="ibanOptions"
    @change="ibcompleted = $event.complete"
  >
    <template slot-scope="slotProps">
      <button class="button is-info" :disabled="!ibcompleted" @click="payByIban(slotProps.elements)">
        Pay by IBAN
      </button>
    </template>
  </stripe-element>

  <!-- stripe Card element -->
  <stripe-element
    type="card"
    :stripe="stripeKey"
    @change="cdcompleted = $event.complete"
  >
    <template slot-scope="slotProps">
      <button class="button is-info" :disabled="!cdcompleted" @click="payByCard(slotProps)">
        Pay by Card
      </button>
    </template>
  </stripe-element>
</div>
</template>

<script>
/* eslint-disable no-console */
  import { StripeElement } from "vue-stripe-better-elements"

  export default {
    name: 'ScopedSlotz',
    components: {
      StripeElement
    },
    data: () => ({
      stripeKey: "pk_test_asHd9bI6LRipeVH0rBys2wxW",
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
          type: "sepa_debit"
        })
          .then(console.log)
          .catch(console.error)
      },
      payByCard(slotProps) {
        slotProps
          .elements
          .createToken()
          .then(console.log)
          .catch(console.error)
      }
    }
  }
</script>