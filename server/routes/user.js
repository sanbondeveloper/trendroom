const router = require('express').Router();
const User = require('../models/user');
const Address = require('../models/address');

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

router.get('/addresses', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('addressList');

    console.log(user.addressList);

    return res.status(200).json(user.addressList);
  } catch (error) {
    console.error(error);

    return res.status(500).json();
  }
});

router.post('/address', async (req, res) => {
  try {
    const { address: addressInfo } = req.body;
    const { checked, ...address } = addressInfo;

    const user = await User.findById(req.user.id);
    const newAddress = await Address.create({ ...address, user: user._id });

    user.addressList.push(newAddress._id);

    if (checked || !user.defaultAddress) {
      user.defaultAddress = newAddress._id;
    }

    await user.save();

    return res.status(200).json(newAddress);
  } catch (error) {
    console.error(error);

    return res.status(500).json();
  }
});

module.exports = router;
