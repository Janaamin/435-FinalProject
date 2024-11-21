const User = require('../models/user');


//Fetch all agents
const getAllAgents = async (req, res) => {
    try{
        const agents = await User.find({role: 'agent'}).select('-password');
        res.status(200).json(agents);
    } catch (error){
        console.error('Get all agents error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

//Fetching user profile
const getUserProfile = async (req, res) => {
    try {
      const userId = req.user.userId; // Extract user ID from decoded token
  
      const user = await User.findById(userId).select('-password'); // Fetch user, exclude password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

//Update user profile
const updateUserProfile = async (req, res) => {
    try {
      const userId = req.user.userId; // Extract user ID from decoded token
      const updates = req.body; // Get updates from the request body
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true } // Return the updated document and validate inputs
      ).select('-password'); // Exclude password from the response
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const isValidUrl = (url) => {
    const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    return urlRegex.test(url);
  };
  
//   if (updates.image && !isValidUrl(updates.image)) {
//     return res.status(400).json({ message: 'Invalid image URL' });
//   }
  
  module.exports = { getUserProfile, updateUserProfile, getAllAgents };
  