const Category = require('../models/Category.model')

module.exports.categoryController = {
    getCategory: async (req, res) => {
        const data = await Category.find();
        await res.json(data);
    },
    postCategory: async (req, res) => {
        const data = await Category.create({
            image: req.body.image,
            
            title: req.body.title,
            description: req.body.description,
        })
        await res.json(data);
    },
}