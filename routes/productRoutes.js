const express = require('express');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../middleware/errors');

const router = express.Router();

// In-memory products
let products = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'Smartphone', description: 'Latest model', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Programmable coffee maker', price: 50, category: 'kitchen', inStock: false }
];

// GET all products (with search, filter, pagination)
router.get('/', (req, res) => {
  let results = [...products];

  if (req.query.search) {
    results = results.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()));
  }

  if (req.query.category) {
    results = results.filter(p => p.category === req.query.category);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || results.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    page,
    limit,
    total: results.length,
    data: results.slice(start, end)
  });
});

// GET product by ID
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST create product
router.post('/', auth, validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', auth, validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  products[index] = { id: req.params.id, ...req.body };
  res.json(products[index]);
});

// DELETE product
router.delete('/:id', auth, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

module.exports = router;