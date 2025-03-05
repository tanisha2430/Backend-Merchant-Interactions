const mongoose=require('mongoose')

const Merchants = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const MerchantData = mongoose.model('MerchantData', Merchants);

module.exports = MerchantData;
