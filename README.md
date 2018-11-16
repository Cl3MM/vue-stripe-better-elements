# Vue-stripe-better-elements

## What?

[vue-stripe-elements](https://github.com/fromAtoB/vue-stripe-elements), but different.

## Why?

I needed [Iban](https://stripe.com/docs/stripe-js/elements/iban) support, not provided by
[vue-stripe-elements](https://github.com/fromAtoB/vue-stripe-elements)

Moreover [vue-stripe-elements](https://github.com/fromAtoB/vue-stripe-elements), prevents
you from using multiple `<stripe-elements/>`
components on the same page, as there is only one instance of the `createToken` and
`createSource` methods needed to further process payment.

Anyway, I forked [vue-stripe-elements](https://github.com/fromAtoB/vue-stripe-elements) and
added [scoped slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) and made
`createToken` and `createSource` methods accessible per component.

## How?

Install the package:

```
// if your one of the cool kidz:
yarn add vue-stripe-better-elements
// or if you're old school:
npm i vue-stripe-better-elements
```

Make sure you include the [Stripe.js library](https://stripe.com/docs/stripe-js)
somewhere in your page

```html
<script src="https://js.stripe.com/v3/"></script>
```

You should be good to go!

### What you get for free:

The library exports several properties, but you will mainly use:

- The `StripeElement` component, that calls the [Stripe.js library](https://stripe.com/docs/stripe-js) under the hood and display
  the [stripe Element](https://stripe.com/docs/stripe-js/reference#element-types)
  matching the `type` props:

  ```js
  import { StripeElement } from
  <stripe-element type="card" />
  <stripe-element type="iban" />
  ```

- A `Stripe` object with the following structure:

  ```js
  {
    components: [ /* list of instanciated components*/ ],
    get: function (componentType, stripeKey) {
      // return the component matching type and key
    }
  }
  ```

Each component looks like this:

```js
{
  type: 'card',         // element type (card, iban...)
  key: 'pk_test_xxxx',  // the stripe key used for this component,
  element: {/*..*/},    // the stripe element created by the Stripe library,
  elements: {/*..*/},   // the stripe elements created by the Stripe library,
  createToken: fn,      // the element's createToken function
  createSource: fn,     // the element's createSource function
  retrieveSource: fn    // the element's retrieveSource function
}
```

### Component props:

- **type (required):**

  A string containg a [stripe Element type](https://stripe.com/docs/stripe-js/reference#element-types).
  Currently accepts one of the following: `card`, `iban`, `cardNumber`, `cardExpiry`,
  `cardCvc`

- **stripe**:

  Your stripe public key (`pk_test_xxxxxxxxxxxxxxxxxxxxxxxx`) or a stripe instance.

- **options**

  A [stripe Element options](https://stripe.com/docs/stripe-js/reference#element-options)
  to instanciate the current element.
  For example, the Iban element needs a `{supportedCountries: ['SEPA']}` option object.

- **stripeOptions**

  A [stripe Elements option](https://stripe.com/docs/stripe-js/reference#stripe-elements)

### STFU & Show me the code

There are two ways to use the library:

#### Using Scoped Slots

```html
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
        <button :disabled="!ibcompleted" @click="payByIban(slotProps.elements)">
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
        <button :disabled="!cdcompleted" @click="payByCard(slotProps)">
          Pay by Card
        </button>
      </template>
    </stripe-element>
  </div>
</template>

<script>
  import { StripeElement } from "vue-stripe-better-elements"

  export default {
    components: {
      StripeElement
    },
    data: () => ({
      stripeKey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx",
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
        slotProps.elements
          .createToken()
          .then(console.log)
          .catch(console.error)
      }
    }
  }
</script>
```

#### Using global Stripe object

If you need to display the payment button somewhere else in your page, then this
is for you:

```html
<template>
  <div class="container">
    <!-- stripe Iban element -->
    <stripe-element
      type="iban"
      :options="ibanOptions"
      :stripe="stripeKey"
      @change="ibcompleted = $event.complete"
    >
    </stripe-element>

    <!-- stripe Card element -->
    <stripe-element
      type="card"
      :stripe="stripeKey"
      @change="cdcompleted = $event.complete"
    >
    </stripe-element>

    <button :disabled="!cdcompleted" @click="payByCard">Pay by Card</button>
    <button :disabled="!ibcompleted" @click="payByIban">Pay by IBAN</button>
  </div>
</template>

<script>
  import { StripeElement, Stripe } from "vue-stripe-better-elements"

  export default {
    components: {
      StripeElement
    },
    data: () => ({
      stripeKey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx",
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
```

### Example

You will find an example in the `example` folder (how original).

```
npm install -g @vue/cli-service-global
git clone https://github.com/Cl3MM/vue-stripe-better-elements.git
cd example
yarn install
vue serve
```

Then, point your browser to the URL displayed in your terminal.

## Rant

Not carefully tested, use at your own risks.

If you find a bug, make a PR.
If you find more bugs, make more PR.

Don't open an issue asking for unit tests. If you need tests, write a PR.
