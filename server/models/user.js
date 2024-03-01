const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    interests: { type: Array, default: [] },
    defaultAddress: {
      name: { type: String },
      phone: { type: String },
      zipcode: { type: String },
      address: { type: String },
      details: { type: String },
    },
    addressList: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.create = async function (payload) {
  const todo = new this(payload);

  return await todo.save();
};

userSchema.statics.doubleCheck = async function ({ email, nickname }) {
  let user = await this.findOne({ email });
  if (user) return 'email';

  user = await this.findOne({ nickname });
  if (user) return 'nickname';

  return null;
};

userSchema.statics.interest = async function ({ userId, product }) {
  const user = await this.findById(userId);
  const interests = user.interests.map((product) => product.id);

  if (interests.includes(product.id)) {
    user.interests.splice(interests.indexOf(product.id), 1);
  } else {
    user.interests.push(product);
  }

  return await user.save();
};

userSchema.statics.addAddress = async function ({ userId, addressInfo }) {
  const user = await this.findById(userId);
  const id = user.addressList.length + 1;
  const { checked, ...address } = addressInfo;

  user.addressList.push({ ...address, id });

  if (checked) {
    user.defaultAddress = address;
  }

  return await user.save();
};

module.exports = mongoose.model('User', userSchema);
