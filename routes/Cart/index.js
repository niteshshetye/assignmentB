const router = require('express').Router();
const Cart = require('../../models/Cart');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../../utils/verifyToken');

// Create
router.post('/', verifyToken, async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    }catch(error){
        res.status(500).json(error)
    }
});

// update
router.put('/:id', verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateCart)
    }catch(error){
        res.status(500).json(error)
    }
})

// // delete
router.delete('/:id', verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart Removed!"); 
    }catch(error){
        res.status(500).json(error); 
    }
});

// Get Carts
router.get('/find/:userId', verifyTokenAndAuthorization,async (req, res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json(error);
    }
});

// Get all Carts
router.get('/', verifyTokenAndAdmin, async(req, res)=>{
    try{
        const cart = await Cart.find();
        res.status(200).json(cart)
    }catch(error){
        res.status(500).json(error);
    }
})


module.exports = router;