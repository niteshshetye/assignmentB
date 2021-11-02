const router = require('express').Router();
const User = require('../../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req,res)=>{
    const newUser = User({
        username: req.body.username, 
        email: req.body.email, 
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
    })
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
})

// Login
router.post('/login', async(req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        !user && res.status(401).json('User Not Found');
        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC_KEY);
        const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
        OriginalPassword !== req.body.password && res.status(401).json("Password is Wrong");
        const {password, ...other} = user._doc;
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.TOKEN_SEC_KEY,
            { expiresIn: '3d' }
        )
        res.status(200).json({...other, accessToken});
    }catch(error){
        res.status(500).json(error)
    }
    
})


module.exports = router;