const Product = require('../models/product.model.js');

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Product name can not be empty"
        });
    }

    if(!req.body.price) {
        return res.status(400).send({
            message: "Product price can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        name: req.body.name , 
        price: req.body.price,
        description: req.body.description || "Authenticated Product"
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all Product from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(product => {
        res.send(product);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Product."
        });
    });
};

// Find a single Product with a ProductId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Product with id " + req.params.productId
        });
    });
};

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Product name can not be empty"
        });
    }

    if(!req.body.price) {
        return res.status(400).send({
            message: "Product price can not be empty"
        });
    }

    // Find Product and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description || "Authenticated Product"
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating Product with id " + req.params.productId
        });
    });
};

