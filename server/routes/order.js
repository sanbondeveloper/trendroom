const router = require('express').Router();
const User = require('../models/user');
const Order = require('../models/order');

router.post('/order', async (req, res) => {
  try {
    const { orderInfo } = req.body;
    const { message, ...info } = orderInfo;
    const user = await User.findById(req.user.id);

    const newOrder = await Order.create({ ...info, message: message.text, user: user._id });

    user.orderHistory.push(newOrder);
    await user.save();

    return res.status(200).json();
  } catch (error) {
    console.error(error);

    return res.status(500).json();
  }
});

module.exports = router;
