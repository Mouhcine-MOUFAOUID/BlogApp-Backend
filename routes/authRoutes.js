const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.toAuthenticate);
router.get('/profile', authController.profile)
router.post('/logout', authController.logout)

module.exports = router;
