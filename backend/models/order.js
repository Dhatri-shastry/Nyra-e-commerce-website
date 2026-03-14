const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
  uid: String,
  email: String,
  name: String,
},
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
