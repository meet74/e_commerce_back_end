const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart