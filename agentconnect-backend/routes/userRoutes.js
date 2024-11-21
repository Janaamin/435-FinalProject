const express = require('express');
const { getUserProfile, updateUserProfile, getAllAgents } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


//View user profile
router.get('/profile', authMiddleware, getUserProfile);

//Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

//get all agents
router.get('/agents', authMiddleware, getAllAgents);

module.exports = router;
