const Product = require('../models/Product');

const createProduct = async (data) => {
  return Product.create(data);
};

const getAllProducts = async () => {
  return Product.find();
};

const getProductById = async (id) => {
  return Product.findById(id);
};

const updateProduct = async (id, data) => {
  return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteProduct = async (id) => {
  return Product.findByIdAndDelete(id);
};

const searchByName = async (name) => {
  return Product.find({ productName: { $regex: name, $options: 'i' } });
};

const filterByCategory = async (cat) => {
  return Product.find({ category: { $regex: cat, $options: 'i' } });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchByName,
  filterByCategory,
};
