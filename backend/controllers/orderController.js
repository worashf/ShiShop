
const Order = require("../models/order")
const Product = require("../models/product")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

// Create  new order =>  /api/v1/order/new

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user:req.user._id
    })
    
    if (!order) {
         return next( new ErrorHandler("Some thing went wrong, Order does not created",401))
    }

    res.status(200).json({
        success: true, 
        order
    })

})

// Get single order = > /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user",'name email')
    if (!order) {
        return  next(new ErrorHandler(`No oder found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true, 
        order
   }) 
})


 // Get logged in user order = > /api/v1/order/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user:req.user.id})
    if (!orders) {
        return  next(new ErrorHandler(`No oders found for: ${req.user.email}`))
    }
    res.status(200).json({
        success: true, 
        orders
   }) 
})
