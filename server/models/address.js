const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    zipcode: { type: String, required: true },
    address: { type: String, required: true },
    details: { type: String, required: true },
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

addressSchema.statics.create = async function (payload) {
  const address = new this(payload);

  return await address.save();
};

module.exports = mongoose.model('Address', addressSchema);
