const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const { email, password, nickname } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const type = await User.doubleCheck({ email, nickname });

    if (type)
      return res
        .status(409)
        .json(type === 'email' ? { message: 'Email already exists' } : { message: 'Nickname already exists' });

    await User.create({ email, password: hashedPassword, nickname });

    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (err) {
    console.error(err);

    res.status(500).json();
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json();

    res.status(200).json({ email: user.email, nickname: user.nickname, _id: user._id });
  } catch (err) {
    console.error(err);

    res.status(500).json();
  }
});

module.exports = router;
