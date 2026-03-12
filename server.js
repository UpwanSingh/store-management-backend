const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
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

// ─── Error Handling Middleware (must be last) ──────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
