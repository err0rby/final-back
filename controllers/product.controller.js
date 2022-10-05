const Product = require("../models/Product.model");

module.exports.productController = {
  getProduct: async (req, res) => {
    const data = await Product.find();
    await res.json(data);
  },
  getProductId: async (req, res) => {
    const data = await Product.findById(req.params.id);
    await res.json(data);
  },
  postProduct: async (req, res) => {
    const data = await Product.create({
      image: req.body.image,

      category: req.body.category,

      name: req.body.name,
      private: req.body.private,
      description: req.body.description,
      priceStart: req.body.priceStart,
      priceFinal: req.body.priceFinal,

      timer: req.body.timer,
      timeNow: new Date(),

      bet: []
    });
    await res.json(data);
  },

  patchProd: async (req, res) => {
    try {
      const data = await Product.findByIdAndUpdate(req.params.id, { $set: { priceStart: req.body.priceStart } }, { new: true });
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  }
};