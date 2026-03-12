const express = require('express');
const cors = require('cors');
const productRoutes = require('../routes/productRoutes');
const errorHandler = require('../middleware/errorHandler');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Store Inventory Management API is running',
    endpoints: {
      getAllProducts: 'GET    /products',
      addProduct: 'POST   /products',
      getProductById: 'GET    /products/:id',
      updateProduct: 'PUT    /products/:id',
      deleteProduct: 'DELETE /products/:id',
      searchByName: 'GET    /products/search?name=xyz',
      filterByCategory: 'GET    /products/category?cat=xyz',
    },
  });
});

// Error handling (last)
app.use(errorHandler);

module.exports = app;
