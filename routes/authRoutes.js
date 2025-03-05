const express = require('express');

const { signup, login } = require('../controllers/authController');
const { fetchUsers } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', fetchUsers, (req, res) => {
    res.json({ message: 'You are authorized' });
});

module.exports = router;