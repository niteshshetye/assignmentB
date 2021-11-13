const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        insideCart: {type: Object, required: true}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Cart', CartSchema);