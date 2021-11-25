const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const {verifyToken} = require('../../utils/verifyToken')
const {v4: uuidv4} =require('uuid');
// console.log(stripe);

router.get('/payment', (req, res) => {
    res.send('Payment nahi ho raha ky')
})
// router.post('/payment',(req,res)=>{
//     console.log("req: ", req.body);
//     console.log("header: ", req.headers)
//     stripe.charges.create({
//         source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: 'usd',
//     },(stripeErr, stripeRes) => {
//         if(stripeErr){
//             res.status(500).json(stripeErr);
//         }else{
//             res.status(200).json(stripeRes);
//         }
//     })
// });

router.post('/payment', verifyToken,(req,res)=>{
    const {token, amount} = req.body;
    const {id} = req.user;
    // console.log("tokenId", token)
    // console.log("tokenId", amount)
    // console.log("req user", req.user)
    const idempontencykey = uuidv4()
    stripe.charges.create({
        source: token.id,
        amount: amount*100,
        currency: 'usd',
    }, {idempontencykey})
    .then(res => res.status(200).json(res))
    .catch(error => res.status(500).json(error))
});

module.exports = router