const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, 'Product Name is required'],
            trim: true,
        },
        productCode: {
            type: String,
            required: [true, 'Product Code is required'],
            unique: true,
            trim: true,
            uppercase: true,
        },
        category: {
            type: String,
            enum: ['Electronics', 'Clothing', 'Food', 'Furniture', 'Other'],
            required: [true, 'Category is required'],
        },
        supplierName: {
            type: String,
            required: [true, 'Supplier Name is required'],
            trim: true,
        },
        quantityInStock: {
            type: Number,
            required: [true, 'Quantity in Stock is required'],
            min: [0, 'Quantity in Stock must be a non-negative number'],
        },
        reorderLevel: {
            type: Number,
            required: [true, 'Reorder Level is required'],
            min: [1, 'Reorder Level must be greater than 0'],
        },
        unitPrice: {
            type: Number,
            required: [true, 'Unit Price is required'],
            min: [0.01, 'Unit Price must be a positive value'],
        },
        manufactureDate: {
            type: Date,
        },
        productType: {
            type: String,
            enum: ['Perishable', 'Non-Perishable'],
            required: [true, 'Product Type is required'],
        },
        status: {
            type: String,
            enum: ['Available', 'Out of Stock'],
            default: 'Available',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', ProductSchema);
