<template>
  <div id="app">
    <h2 class="title is-h2">Without Scoped Slots</h2>
    <input class="input" type="text" value="DE89 3704 0044 0532 0130 00">
    <no-slots />
    <h2 class="title is-h2">With Scoped Slots</h2>
    <scoped-slot />
  </div>
</template>

<script>
/* eslint-disable no-console */
import NoSlots from './NoSlots'
import ScopedSlot from './ScopedSlot'

export default {
  name: 'app',
  components: {
    NoSlots,
    ScopedSlot
  }
}
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
