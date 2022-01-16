const express = require('express');
const Cart = require('../database/schema/cartSchema');

const router = express.Router();

router.get('/getcartdata', (req, res) => {
    const data = JSON.parse(req.query.data)
    console.log(data.id);
    if (data.id != null) {
        const id = data.id;
        Cart.find({ id }).then(result => {
            console.log(result);
            res.status(200).json({
                result
            });
        }).catch(err => {
            console.log(err);
        })
    }
})

router.post('/addtocart', async (req, res) => {

    const data = JSON.parse(req.query.data)
    console.log(data);
    const id = data.id;
    const name = data.name;
    const price = data.price;
    const quantity = data.quantity;
    const image = data.image;

    const cart = new Cart({
        id: id,
        name: name,
        quantity: quantity,
        price: price,
        image: image
    })

    cart.save().then(result => {
        console.log("cartItem created");
    }).catch((error) => {
        console.log(error);
    })
})

router.post('/updateCart', (req, res) => {
    const data = JSON.parse(req.query.data)
    const id = data.id;
    const name = data.name;
    const price = data.price;
    const quantity = data.quantity;
    const image = data.image;
    console.log(quantity);

    Cart.findOne({ id }).then(cart => {

        cart.id = id,
            cart.name = name,
            cart.quantity = quantity,
            cart.price = price,
            cart.image = image
        console.log(cart);
        return cart.save()
    }).then(() => {
        console.log("Updated Cart");
    }).catch(err => {
        console.log(err);
    })
})

router.post('/deleteCartItem', (req, res) => {
    const data = JSON.parse(req.query.data)
    const id = data.id;
    Cart.findOneAndRemove({ id }).then(() => {
        console.log('Removed Successfully');
        res.status(200).json({

            message: "Success"
        });
    }).catch(err => {
        console.log(err);
    })
})
module.exports = router