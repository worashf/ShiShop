const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeature');

exports.newProduct = CatchAsyncError(async (req, res, next) => {
  
  req.body.user = req.user.id // add user to request body
  const product = await Product.create(req.body);
  res.status(200).json({
    status: true,
    product,
  });
});
//  get all products => /api/v1/products
exports.getProducts = CatchAsyncError(async (req, res, next) => {
  const resPerPage = 4;

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  
  const productsCount = await Product.countDocuments()
  setTimeout(() => {
    res.status(200).json({ 
      status: true,
      productsCount,
      products,
      resPerPage
    });
  },2000)

});

// get single product details => /api/v1/products/:id

exports.productDetails = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('No product found', 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: 'Product deleted successfuly',
  });
});
