const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const firebaseAuth = require("../middleware/firebaseAuth");
const authMiddleware = require('../middlewares/authMiddleware');

// CREATE ORDER
router.post("/", firebaseAuth, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/orders', authMiddleware, (req, res) => {
  const { user } = req; // Verified user
  // Create order for user.uid
  res.json({ message: `Order created for user ${user.uid}` });
});

// GET USER ORDERS
router.get("/", firebaseAuth, async (req, res) => {
  try {
    const orders = await Order.find({ "user.uid": req.user.uid });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
