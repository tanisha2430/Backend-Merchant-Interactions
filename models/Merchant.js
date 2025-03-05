const mongoose=require('mongoose')

const Merchants = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // interactions: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'InteractionData', 
    //     }
    //   ],
    //   tasks: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'TaskData', 
    //     }
    //   ],
    // notifications: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'NotificationData',
    //     }
    //   ]
});

const MerchantData = mongoose.model('MerchantData', Merchants);

module.exports = MerchantData;
