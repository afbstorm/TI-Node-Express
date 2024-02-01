const ProductModel = require('./product.model');

const ProductController = {
    getProducts: async (req, res) => {
        try {
            const products = await ProductModel.getProducts();
            res.render('products', { products })
        } catch (err) {
            console.error(err)
        }
    },

    getProductDetail: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await ProductModel.getProductDetail(id);

            res.render('details', { product });
        } catch (err) {
            console.error(err)
        }
    }
};

module.exports = ProductController;
