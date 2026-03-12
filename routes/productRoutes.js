const express = require('express');
const router = express.Router();

const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchByName,
    filterByCategory,
} = require('../controllers/productController');

// IMPORTANT: /search and /category routes must be defined BEFORE /:id
// to prevent Express from treating "search" and "category" as ID values

// GET /products/search?name=xyz  — Search by product name
router.get('/search', searchByName);

// GET /products/category?cat=xyz — Filter by category
router.get('/category', filterByCategory);

// GET    /products       — Get all products
// POST   /products       — Add a new product
router.route('/').get(getAllProducts).post(addProduct);

// GET    /products/:id   — Get product by ID
// PUT    /products/:id   — Update product
// DELETE /products/:id   — Delete product
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
