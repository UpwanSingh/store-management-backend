const Product = require('../models/Product');

// @desc    Add a new product
// @route   POST /products
// @access  Public
const addProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all products
// @route   GET /products
// @access  Public
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get product by ID
// @route   GET /products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            const error = new Error(`Product not found with id: ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update product details
// @route   PUT /products/:id
// @access  Public
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            const error = new Error(`Product not found with id: ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a product
// @route   DELETE /products/:id
// @access  Public
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            const error = new Error(`Product not found with id: ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Search products by name
// @route   GET /products/search?name=xyz
// @access  Public
const searchByName = async (req, res, next) => {
    try {
        const { name } = req.query;

        if (!name) {
            const error = new Error('Please provide a name query parameter');
            error.statusCode = 400;
            return next(error);
        }

        const products = await Product.find({
            productName: { $regex: name, $options: 'i' },
        });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Filter products by category
// @route   GET /products/category?cat=xyz
// @access  Public
const filterByCategory = async (req, res, next) => {
    try {
        const { cat } = req.query;

        if (!cat) {
            const error = new Error('Please provide a cat query parameter');
            error.statusCode = 400;
            return next(error);
        }

        const products = await Product.find({
            category: { $regex: cat, $options: 'i' },
        });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchByName,
    filterByCategory,
};
