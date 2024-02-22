const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
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

module.exports = mongoose.model('User', userSchema);
