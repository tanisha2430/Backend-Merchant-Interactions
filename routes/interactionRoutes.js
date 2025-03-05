const express = require('express');
const { createInteraction, getInteractions,getInteractionByID } = require('../controllers/interactionController');
const router = express.Router();

router.post('/interactions', createInteraction);
router.get('/interactions', getInteractions);
router.get('/interactions/:id', getInteractionByID);


module.exports = router;
