const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    interests: { type: Array, default: [] },
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

userSchema.methods.getInterests = async function ({ userId }) {
  const user = await this.findById(userId);

  return user.interests;
};

module.exports = mongoose.model('User', userSchema);
