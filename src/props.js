export default {
  type: {
    type: String,
    required: true,
    validator: function(value) {
      return (
        ["card", "iban", "postalCode", "cardNumber", "cardExpiry", "cardCvc"]
          .map(s => s.toLowerCase())
          .indexOf(value.toLowerCase()) > -1
      )
    }
  },
  stripe: {
    type: [String, Object], // stripe key or instance
    required: true
  },
  value: {
    type: String,
    required: false
  },
  options: {
    type: Object,
    required: false,
    default: () => ({})
  },
  stripeOptions: {
    type: Object,
    required: false,
    default: () => ({})
  }
}
