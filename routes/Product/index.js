const router = require('express').Router();
const Product = require('../../models/Product');
const {verifyTokenAndAdmin} = require('../../utils/verifyToken');

// Create
router.post('/', verifyTokenAndAdmin, async(req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }catch(error){
        res.status(500).json(error)
    }
});

// update
router.put('/:id', verifyTokenAndAdmin, async(req, res)=>{
    try{
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateProduct)
    }catch(error){
        res.status(500).json(error)
    }
})

// delete
router.delete('/:id', verifyTokenAndAdmin, async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product Removed!"); 
    }catch(error){
        res.status(500).json(error); 
    }
});

// Get Product
router.get('/find/:id', async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json(error);
    }
});

// Get all products
router.get('/', async (req, res)=>{
    const qNew = req.query.new;
    const qCategories = req.query.categories
    let products;
    try{
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        }else if(qCategories){
            products = await Product.find({ categories:{ $in: [qCategories] } });
        }else {
            products = await Product.find();
        }
        res.status(200).json(products);
    }catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;