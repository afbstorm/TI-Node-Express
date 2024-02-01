const fs = require('fs');
const products = JSON.parse(fs.readFileSync(__dirname+'/products.json', 'utf-8'));

const ProductModel = {
    getProducts: () => {
        return products;
    },

    getProductDetail: (id) => {
        const product = products.find(product => product.id === id)
        return product;
    }
};

module.exports = ProductModel;
