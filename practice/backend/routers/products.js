var express = require('express')
var router = express.Router()

const {Product} = require('../models/product');

router.get(`/`, async (req, res)=> {
    const productList = await Product.find();

    if(!productList){5585
        res.status(500).json({success: false});
    }

    res.send(productList);
})

router.post('/', (req, res)=> {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct)=> {
        res.status(201).send(createdProduct);
    }).catch((err)=> {
        res.status(500).send({error: err, success: false});
    })


})

module.exports = router;
5585