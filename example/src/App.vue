<template>
  <div id="app" class="container">
    <h2 class="title is-h2">Without Scoped Slots</h2>
    <div class="field">
      <label class="label">IBAN test Number</label>
      <div class="control">
        <input class="input" type="text" value="DE89 3704 0044 0532 0130 00" />
      </div>
    </div>
    <div class="field">
      <label class="label">Credit card test number</label>
      <div class="control">
        <input class="input" type="text" value="4242 4242 4242 4242" />
      </div>
    </div>
    <no-slots :stripe-key="stripeKey" />
    <h2 class="title is-h2">With Scoped Slots</h2>
    <scoped-slot :stripe-key="stripeKey" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import NoSlots from "./components/NoSlots";
import ScopedSlot from "./components/ScopedSlot";

export default {
  name: "App",
  components: {
    NoSlots,
    ScopedSlot
  },
  data: () => ({ stripeKey: process.env.VUE_APP_STRIPE_KEY })
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  margin-bottom: 2em;
}

input,
.StripeElement {
  height: 40px;
  padding: 10px 12px;

  color: #32325d;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 4px;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

input:focus,
.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
