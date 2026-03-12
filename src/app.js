const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('../routes/productRoutes');
const errorHandler = require('../middleware/errorHandler');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve client static assets
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));

// SPA fallback to index.html for client-side routing
app.get(['/app', '/app/*'], (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Routes
app.use('/products', productRoutes);

// Root endpoint
app.get('/', (req, res) => {
  // If client exists, serve it; else respond with JSON
  if (process.env.SERVE_CLIENT === 'true') {
    return res.sendFile(path.join(clientPath, 'index.html'));
  }

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
