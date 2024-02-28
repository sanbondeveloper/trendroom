const router = require('express').Router();
const User = require('../models/user');

router.get('/interest', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    return res.status(200).json(user.interests);
  } catch (error) {
    console.error(error);

    return res.status(500).json();
  }
});
router.post('/interest', async (req, res) => {
  const { userId, product } = req.body;

  try {
    await User.interest({ userId, product });

    return res.status(200).json();
  } catch (error) {
    console.error(error);

    return res.status(500).json();
  }
});

module.exports = router;
