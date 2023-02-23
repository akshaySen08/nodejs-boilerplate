const express = require('express')
const router = express();

const { registerUser, loginUser, getMe } = require('../controllers/user.controller');
const protect = require('../middleware/protectMiddleware');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)


module.exports = router
