const router = require('express').Router();
const User = require('../../models/User');
const CryptoJs = require('crypto-js');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../../utils/verifyToken');

// Update 
router.put('/:id', verifyTokenAndAuthorization, async(req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedUser); 
    }catch(error){
        res.status(500).json(error); 

    }
});

// delete
router.delete('/:id', verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted!"); 
    }catch(error){
        res.status(500).json(error); 
    }
});

// Get user
router.get('/find/:id', verifyTokenAndAdmin, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(error){
        res.status(500).json(error);
    }
});

// Get all users
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    const query = req.query.new
    try{
        const users = query? await User.find().sort({_id: -1}).limit(5) : await User.find()
        res.status(200).json(users);
    }catch(error){
        res.status(500).json(error);
    }
});

// states of user
router.get('/states', verifyTokenAndAdmin, async(req, res) =>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try{
        // match will only select the documents which satisfy the condition
        // Project will create  the field 
        // $month: '$createdAt' => gives us back the month from createdAt field
        // $group will give us back the data by grouping of each same month with total data belong to that month
        const data = await User.aggregate([
            {$match: {createdAt: { $gte: lastYear}}},
            {
                $project: {
                    month: {$month: '$createdAt'}
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: {$sum: 1}
                }
            }
        ])
        res.status(200).json(data);
    }catch(error){
        res.status(500).json(error)
    }
})

module.exports = router;