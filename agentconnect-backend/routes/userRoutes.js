const express = require('express');
const { getUserProfile, updateUserProfile, getAllAgents, getAgentProfile, deleteUserProfile, searchAgents } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');


const router = express.Router();


//View user profile
router.get('/profile', authMiddleware, getUserProfile);

//Update user profile
//router.put('/profile', authMiddleware, updateUserProfile);

//get all agents
router.get('/agents', authMiddleware, getAllAgents);


//Delete user profile
router.delete('/profile/:id', authMiddleware, deleteUserProfile);

// Allow profile picture upload
router.put('/profile', authMiddleware, upload.single('image'), updateUserProfile);

// Search for agents
router.get('/agents/search', authMiddleware, searchAgents);

//Get a specific agent's public profile
router.get('/agents/:id', authMiddleware, getAgentProfile);


module.exports = router;
