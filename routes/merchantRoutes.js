const express = require('express');
const { createMerchant, getMerchants,getMerchantByID } = require('../controllers/merchantController');
const router = express.Router();

router.post('/merchants', createMerchant);
router.get('/merchants', getMerchants);
router.get('/merchants/:id', getMerchantByID);


module.exports = router;
