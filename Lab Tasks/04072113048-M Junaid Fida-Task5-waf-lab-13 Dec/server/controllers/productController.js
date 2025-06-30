const Product = require('../models/Product');

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Fetch products by price range
exports.getProductsByPrice = async (req, res) => {
  const { min, max } = req.query;
  try {
    const products = await Product.find({ Price: { $gte: min, $lte: max } });
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Fetch expired products
exports.getExpiredProducts = async (req, res) => {
  try {
    const currentDate = new Date();
    const products = await Product.find({ ExpiryDate: { $lt: currentDate } });
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Fetch products with quantity less than
exports.getLowQuantityProducts = async (req, res) => {
  const { quantity } = req.query;
  try {
    const products = await Product.find({ Quantity: { $lt: quantity } });
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Fetch products by firm name
exports.getProductsByFirm = async (req, res) => {
  const { firm } = req.query;
  try {
    const products = await Product.find({ FirmName: firm });
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete expired products
exports.deleteExpiredProducts = async (req, res) => {
  try {
    let today = new Date()
    await Product.deleteMany({ ExpiryDate: { $lt: today } });
    res.send('Expired products deleted');
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update price by firm name
exports.updatePriceByFirm = async (req, res) => {
  const { firm, newPrice } = req.body;
  try {
    await Product.updateMany({ FirmName: firm }, { Price: newPrice });
    res.send('Prices updated');
  } catch (err) {
    res.status(500).send(err);
  }
};