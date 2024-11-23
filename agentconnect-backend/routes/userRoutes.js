const express = require('express');
const { getUserProfile, updateUserProfile, getAllAgents, getAgentProfile, deleteUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


//View user profile
router.get('/profile', authMiddleware, getUserProfile);

//Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

//get all agents
router.get('/agents', authMiddleware, getAllAgents);

//Get a specific agent's public profile
router.get('/agents/:id', authMiddleware, getAgentProfile);

//Delete user profile
router.delete('/profile/:id', authMiddleware, deleteUserProfile);

module.exports = router;
