const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product: {
      id: { type: String, required: true },
      size: { type: String, required: true },
    },
    address: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      zipcode: { type: String, required: true },
      address: { type: String, required: true },
      details: { type: String, required: true },
    },
    message: { type: String, required: true },
    payment: {
      type: { type: String, required: true },
      amount: { type: Number, required: true },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.statics.create = async function (payload) {
  const order = new this(payload);

  return await order.save();
};

module.exports = mongoose.model('Order', orderSchema);
