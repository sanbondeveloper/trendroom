const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    const customUser = { nickname: user.nickname, id: user._id };

    const accessToken = jwt.sign(customUser, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    res.cookie('access_token', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.status(200).json({ ...customUser, accessToken });
  } catch (err) {
    console.error(err);

    res.status(500).json();
  }
});

module.exports = router;
